const { Selector } = require('testcafe');

module.exports = {
  baseURL: 'https://demo.nopcommerce.com/',
  browsers: 'chrome',
  src: [
    'node_modules/testcafe-cucumber-steps/index.js',
    'test/*.test.ts',
    'features/*.feature',
    'features/step_definitions/*.ts',
  ],
  concurrency: 1,
  skipJsErrors: true,
  skipUncaughtErrors: true,
  selectorTimeout: 3000,
  assertionTimeout: 1000,
  pageLoadTimeout: 1000,
  disablePageCaching: true,

  screenshots: {
    path: './screenshots',
    thumbnails: false,
    takeOnFails: true,
    fullPage: true,
    pathPattern: '${DATE}_${TIME}_test-${TEST_INDEX}/${FILE_INDEX}.png',
    pathPatternOnFails: '/failedTests/${DATE}_${TIME}_test-${TEST_INDEX}/${FILE_INDEX}.png',
  },

  customActions: {
    async clickButtonWithText(text) {
      await this.click(Selector('button').withText(text));
    },
  },
};
