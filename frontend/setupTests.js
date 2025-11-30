import "@testing-library/jest-dom";
require('jest-fetch-mock').enableMocks();

// 👇 FIX lỗi TextEncoder không tồn tại trong Jest
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
