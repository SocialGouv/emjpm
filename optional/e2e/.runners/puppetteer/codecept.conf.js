exports.config = {
  output: "./output",
  helpers: {
    Puppeteer: {
      chrome: {
        args: process.env.CI
          ? ["--no-sandbox", "--disable-setuid-sandbox"]
          : ["--window-size=1024,1024"],
        defaultViewport: {
          width: 1024,
          height: 1024
        },
        executablePath: process.env.CI && "/usr/bin/chromium-browser",
        headless: process.env.CI ? true : process.env.HEADLESS ? true : false
      },
      restart: false,
      url: process.env.CODECEPT_BASEURL || "http://localhost:3000"
    }
  },
  include: {
    I: "./steps_file.js"
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: "../../features/*.feature",
    steps: [
      "./step_definitions/_global.js",
      "./step_definitions/database.js",
      "./step_definitions/email.js"
    ]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: "./specs/*_test.js",
  name: "emjpm"
};
