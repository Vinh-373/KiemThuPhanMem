module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/cypress/"], // bỏ qua Cypress
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
