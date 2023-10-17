module.exports = {
    "transform": {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    "testEnvironment": "node",
    "testMatch": ["**/tests/**/*.spec.js"],
    globalSetup: '<rootDir>/tests/globalSetup.js',
    globalTeardown: '<rootDir>/tests/globalTeardown.js'
}