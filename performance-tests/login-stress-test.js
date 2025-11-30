import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 500 },   // Increase to 500
    { duration: '5m', target: 1000 },  // Increase to 1000
    { duration: '5m', target: 2000 },  // Push further
    { duration: '3m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.5'], // Accept 50% failures
  },
};

export default function() {
  const url = 'http://localhost:8080/api/auth/mock/login';
  const payload = JSON.stringify({
    username: 'vinhne',
    password: 'password123',
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}