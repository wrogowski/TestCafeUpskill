const { Selector } = require('testcafe');

module.exports = {
  baseURL: 'https://demo.nopcommerce.com/',
  browsers: 'chrome',
  src: './test/*.test.ts',
  concurrency: 1,

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
