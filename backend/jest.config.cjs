module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],

  // ✅ coverage native (évite babel-plugin-istanbul)
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: ['controllers/**/*.js', 'middlewares/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],

  // ✅ empêche toute transformation (donc pas Babel)
  transform: {}
};
