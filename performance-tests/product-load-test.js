import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '5m', target: 200 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function() {
  // Test GET /api/products
  const getRes = http.get('http://localhost:8080/api/products');
  check(getRes, {
    'GET products status 200': (r) => r.status === 200,
    'GET response time < 300ms': (r) => r.timings.duration < 300,
  });

  // Test GET /api/products/1
  const getByIdRes = http.get('http://localhost:8080/api/products/1');
  check(getByIdRes, {
    'GET by ID status 200': (r) => r.status === 200,
  });

  // Test POST /api/products
  const postRes = http.post('http://localhost:8080/api/products', 
    JSON.stringify({
      name: 'Test Product',
      company: 'Test Co',
      price: 100000,
      quantity: 10,
      description: 'Test description',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(postRes, {
    'POST status 201': (r) => r.status === 201,
  });
}