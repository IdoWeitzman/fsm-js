module.exports = {
  preset: "jest-puppeteer",
  testEnvironment: "jest-environment-puppeteer",
  testMatch: [
    "**/?(*.)+(spec|test).js?(x)", // Match standard spec/test file patterns
    "**/?(*.)+(spec|test).ts?(x)", // Match standard spec/test file patterns for TypeScript
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest", // Support TypeScript and Babel if needed
  },
  globals: {
    URL: "http://localhost:3000", // Change this to your app's URL if needed
  },
  verbose: true, // Set to true for more detailed logs
};
