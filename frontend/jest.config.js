module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],   // 👈 thêm dòng này
  testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
