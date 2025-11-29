export default {
  transform: {},
  extensionsToTreatAsEsm: [".js", ".jsx"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
