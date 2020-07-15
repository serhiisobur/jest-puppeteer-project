const puppeteer = require('puppeteer');
const config = require('../configs/pptr.conf');
const helpers = new (require('../utils/helpers'))();
const expect = require('chai').expect;
const { navigator, handler } = require('../utils/helpers');

let browser,
  page = null;
const iPhone = puppeteer.devices['iPhone 6'];
const iPad = puppeteer.devices['iPad'];

describe('Check device emulation with incognito mode', () => {
  before(async () => {
    browser = await puppeteer.launch(config);
    const context = await browser.createIncognitoBrowserContext();
    page = await context.newPage();
  });

  after(async () => await browser.close());

  it('should emulate desktop', async () => {
    await page.setViewport({ width: 1600, height: 1050 });
    await page.goto('http://zero.webappsecurity.com/');
    await page.waitFor(1000);
  });

  it('should emulate tablet', async () => {
    await page.emulate(iPad);
    await page.goto('http://zero.webappsecurity.com/');
    await page.waitFor(1000);
  });

  it('should emulate mobile', async () => {
    await page.emulate(iPhone);
    await page.goto('http://zero.webappsecurity.com/');
    await page.waitFor(1000);
  });
});
