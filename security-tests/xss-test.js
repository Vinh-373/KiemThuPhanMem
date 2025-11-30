import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function() {
  // XSS Payloads
  const xssPayloads = [
    { username: '<script>alert("XSS")</script>', password: 'test' },
    { username: '"><script>alert(1)</script>', password: 'test' },
    { username: 'test', password: '<img src=x onerror="alert(1)">' },
    { username: 'test", "img": "<svg/onload=alert(1)>', password: 'test' },
  ];

  xssPayloads.forEach((payload) => {
    const url = 'http://localhost:8080/api/auth/login';
    const res = http.post(url, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'XSS script not in response': (r) => !r.body.includes('<script>'),
      'Response is JSON': (r) => r.headers['Content-Type']?.includes('application/json'),
    });

    console.log(`XSS Payload tested: ${JSON.stringify(payload)}`);
  });
}