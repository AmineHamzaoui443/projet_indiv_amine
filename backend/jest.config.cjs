module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: ['controllers/**/*.js', 'middlewares/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text']
};
