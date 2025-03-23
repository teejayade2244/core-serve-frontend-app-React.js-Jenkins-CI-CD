// filepath: /d:/Downloads/nysc-project/jest.config.js
module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/(?!(@mui|@babel|react-icons)/)"],
    moduleDirectories: ["node_modules", "src"],
}
