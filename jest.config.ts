import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node", // Use Node.js environment for tests
  testMatch: ["**/tests/**/*.test.ts"], // Match test files in the tests folder
  moduleFileExtensions: ["ts", "js"], // Recognize TypeScript and JavaScript files
  collectCoverage: true, // Enable test coverage
  coverageDirectory: "coverage", // Output coverage files to the coverage directory
  verbose: true, // Display detailed test results
  roots: ["<rootDir>/src", "<rootDir>/tests"], // Root directories for the project
};

export default config;
