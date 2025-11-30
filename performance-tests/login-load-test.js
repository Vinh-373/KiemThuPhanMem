import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp-up to 100 users
    { duration: '5m', target: 100 },   // Stay at 100 for 5m
    { duration: '2m', target: 0 },     // Ramp-down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% requests < 500ms
    http_req_failed: ['rate<0.1'],  // Error rate < 10%
  },
};

// performance-tests/login-load-test.js
export default function() {
  const url = 'http://localhost:8080/api/auth/login';  // ← Change to mock endpoint
  const payload = JSON.stringify({
    username: 'vinhne',
    password: 'password123',
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
    timeout: '10s',
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has token': (r) => r.body && r.body.includes('token'),
  });

  sleep(1);
}