module.exports = {
    collectCoverage: true,
    coverageReporters: ["lcov", "text"], // LCOV is for SonarQube
    reporters: [
        "default",
        [
            "jest-junit",
            {
                outputDirectory: "test-results",
                outputName: "junit.xml",
                ancestorSeparator: " › ",
                uniqueOutputName: "false",
                suiteNameTemplate: "{filepath}",
                classNameTemplate: "{classname}",
                titleTemplate: "{title}",
            },
        ],
    ],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    },
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    collectCoverageFrom: ["src/**/*.{js,jsx}", "!src/index.jsx"],
    // coverageThreshold: {
    //     global: {
    //         branches: 80,
    //         functions: 80,
    //         lines: 80,
    //         statements: 80,
    //     },
    // },
}
