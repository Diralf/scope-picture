// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: ['./**/*.spec.js'],
    baseUrl: 'http://localhost:3000/',

    onPrepare: async () => {
        global.dv = browser.driver;
        global.browser = protractor.browser;
        global.until = protractor.ExpectedConditions;
        await browser.waitForAngularEnabled(false);
    },

    plugins: [
        {
            package: 'jasmine2-protractor-utils',
            disableHTMLReport: true,
            screenshotOnSpecFailure: true,
            screenshotOnExpectFailure: true,
            screenshotPath: 'reports/screenshots',
            htmlReportDir: 'reports'
        }
    ]
}
