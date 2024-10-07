module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["**/?(*.)+(spec|test).js?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  globals: {
    URL: "http://localhost:3000",
  },
  verbose: true,
  maxWorkers: 1,
};
