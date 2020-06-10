const path = require('path');

const config = {
  product: "chrome", //At this time, this is either chrome or firefox. See also PUPPETEER_PRODUCT.
  ignoreHTTPSErrors: "false", //Whether to ignore HTTPS errors during navigation. Defaults to false.
  headless: false, //Defaults to true unless the devtools option is true.
  //executablePath: "/Applications/Firefox.app/Contents/MacOS/firefox", //Path to a browser executable to run instead of the bundled Chromium
  //slowMo: 500, //Slows down Puppeteer operations by the specified amount of milliseconds. Useful so that you can see what is going on.
  defaultViewport: {
    width: 1024, //Page width in pixels.
    height: 768, //Page height in pixels.
    deviceScaleFactor: 1, //Specify device scale factor (can be thought of as dpr). Defaults to 1.
    isMobile: false, //Whether the meta viewport tag is taken into account. Defaults to false.
    hasTouch: false, //Specifies if viewport supports touch events. Defaults to false
    isLandscape: false, //Specifies if viewport is in landscape mode. Defaults to false.
  },
  //args: [], //Additional arguments to pass to the browser instance. The list of Chromium flags can be found here, and here is the list of Firefox flags.
  ignoreDefaultArgs: false, // <boolean|Array<string>> If true, then do not use puppeteer.defaultArgs(). If an array is given, then filter out the given default arguments. Dangerous option; use with care. Defaults to false.
  handleSIGINT: true, //Close the browser process on Ctrl-C. Defaults to true.
  handleSIGTERM: true, //Close the browser process on SIGTERM. Defaults to true.
  handleSIGHUP: true, //Close the browser process on SIGHUP. Defaults to true.
  timeout: 30000, //Maximum time in milliseconds to wait for the browser instance to start. Defaults to 30000 (30 seconds). Pass 0 to disable timeout.
  dumpio: false, //Whether to pipe the browser process stdout and stderr into process.stdout and process.stderr. Defaults to false.
  //userDataDir: 'path', //Path to a User Data Directory.
  //env: process.env, //Specify environment variables that will be visible to the browser. Defaults to process.env.
  devtools: false, //Whether to auto-open a DevTools panel for each tab. If this option is true, the headless option will be set false.
  pipe: false, //Connects to the browser over a pipe instead of a WebSocket. Defaults to false.
  //extraPrefsFirefox: {} //<Object> Additional preferences that can be passed to Firefox (see PUPPETEER_PRODUCT)
}

module.exports = config;
