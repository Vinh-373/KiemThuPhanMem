import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const invalidInputs = [
    // Empty fields
    { username: '', password: '' },
    // Too long inputs
    { username: 'a'.repeat(1000), password: 'a'.repeat(1000) },
    // Special characters
    { username: '!@#$%^&*()', password: '!@#$%^&*()' },
    // SQL keywords
    { username: 'SELECT * FROM users', password: 'DROP TABLE' },
    // Null/undefined
    { username: null, password: 'test' },
  ];

  invalidInputs.forEach((input) => {
    const url = 'http://localhost:8080/api/auth/login';
    const res = http.post(url, JSON.stringify(input), {
      headers: { 'Content-Type': 'application/json' },
    });

    check(res, {
      'Invalid input rejected': (r) => r.status === 400 || r.status === 401,
      'Error message provided': (r) => r.body.includes('message'),
    });

    console.log(`Invalid input: ${JSON.stringify(input)} -> Status: ${res.status}`);
  });
}