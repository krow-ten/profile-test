module.exports = {
  setupFiles: ["<rootDir>/test-setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.spec.tsx"],
};
