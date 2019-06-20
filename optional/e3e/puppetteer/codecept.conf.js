exports.config = {
  output: './output',
  helpers: {
    Puppeteer: {
      chrome: {
        headless: false
      },
      url: 'http://localhost:3000'
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: './*_test.js',
  name: 'emjpm'
}
