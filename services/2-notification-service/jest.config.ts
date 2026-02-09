/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Optional: if you use path aliases from tsconfig.json
  moduleNameMapper: {
    '^@notifications/(.*)$': '<rootDir>/src/$1'
  },
  // Optional: collect coverage only from your source files
  collectCoverageFrom: ['src/**/*.ts']
};
