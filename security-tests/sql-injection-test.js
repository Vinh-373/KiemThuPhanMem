import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

export default function() {
  // Test SQL Injection trên Login
  const sqlInjectionPayloads = [
    { username: "' OR '1'='1", password: "' OR '1'='1" },
    { username: "admin' --", password: "anything" },
    { username: "' OR 1=1 --", password: "test" },
    { username: "'; DROP TABLE users; --", password: "test" },
  ];

  sqlInjectionPayloads.forEach((payload) => {
    const url = 'http://localhost:8080/api/auth/login';
    const res = http.post(url, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'SQL Injection blocked - status not 200': (r) => r.status !== 200,
      'No error disclosure': (r) => !r.body.includes('Exception'),
    });

    console.log(`Payload: ${JSON.stringify(payload)} -> Status: ${res.status}`);
  });
}