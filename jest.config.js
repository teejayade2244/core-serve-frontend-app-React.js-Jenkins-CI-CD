module.exports = {
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
        [
            "jest-html-reporter",
            {
                pageTitle: "Test Report",
                outputPath: "test-results/test-report.html",
                includeFailureMsg: true,
                includeSuiteFailure: true,
                styleOverridePath: null,
                useCssFile: false,
            },
        ],
    ],
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
