module.exports = {
    "transform": {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    "testEnvironment": "node",
    "testMatch": ["**/tests/**/*.spec.js"],
    globalSetup: '<rootDir>/tests/backend/globalSetup.js',
    globalTeardown: '<rootDir>/tests/backend/globalTeardown.js',
}