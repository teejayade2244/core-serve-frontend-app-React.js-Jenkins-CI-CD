// filepath: /d:/Downloads/nysc-project/jest.config.js
module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
}
