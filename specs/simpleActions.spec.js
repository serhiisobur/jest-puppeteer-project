const puppeteer = require('puppeteer');
const config = require('../configs/pptr.conf');
const helpers = new (require('../utils/helpers'))();
const expect = require('chai').expect;
const { navigator, handler } = require('../utils/helpers');

const googleUrl = 'https://www.google.com.ua/';
let browser,
  page = null;

describe('Check simple actions', () => {
  before(async () => {
    browser = await puppeteer.launch(config);
    page = await browser.newPage();
  });

  after(async () => await browser.close());

  it('should open the browser', async () => {
    await helpers.navigateTo(page, 'demos');
    expect(await page.url()).to.contain('demos');
  });

  it('should go backward', async () => {
    await page.goto(googleUrl);
    await page.waitForSelector('[aria-label="Search"]');
    await page.goBack();
    expect(await page.url()).to.contain('demos');
  });

  it('should go forward', async () => {
    await page.goForward();
    await page.waitForSelector('[aria-label="Search"]');
    expect(await page.url()).to.contain('google');
  });

  it('should get page title', async () => {
    await helpers.navigateTo(page, 'draggable');
    expect(await page.title()).to.equal('Draggable | jQuery UI');
  });

  it('should type text', async () => {
    await helpers.navigateTo(page, 'autocomplete');
    const frame = await helpers.handler(page);
    await frame.type('.ui-autocomplete-input', 'bla-bla', {
      delay: 10,
    });
  });

  it('should get text from element', async () => {
    await helpers.navigateTo(page, 'button');
    const text = await helpers.getText(page, '.entry-title');
    expect(text).to.equal('Button');
  });

  it('should click button', async () => {
    await helpers.navigateTo(page, 'button');
    const frame = await helpers.handler(page);
    await frame.click('.widget button.ui-button', {
      clickCount: 1,
    });
  });

  it('should check checkboxradio', async () => {
    await helpers.navigateTo(page, 'checkboxradio');
    const frame = await helpers.handler(page);
    await frame.click('[for="radio-1"]', {
      clickCount: 1,
    });
    await frame.waitFor(1000);
    const attr = await frame.evaluate(`document.querySelector('[for="radio-1"]').getAttribute('class')`);
    expect(attr).to.contain('ui-checkboxradio-checked');
  });

  it('should get corect count of elements', async () => {
    await helpers.navigateTo(page, 'selectmenu');
    const frame = await helpers.handler(page);
    const count = await helpers.getElementsCount(frame, 'select');
    expect(count).to.equal(4);
  });

  it('should wait invisibility of element', async () => {
    const signInBtn = '[id="signin_button"]';
    await page.goto('http://zero.webappsecurity.com/');
    await page.click(signInBtn, { clickCount: 1 });
    await page.waitForSelector(signInBtn, { hidden: true, timeout: 1000 });
  });

  it('should choose option in dropdown', async () => {
    const option = 'Both';
    await page.goto('https://devexpress.github.io/testcafe/example/');
    await page.waitForSelector('h1');
    await page.select('[id="preferred-interface"]', option);
  });

  it('should simulate keyboard pressing', async () => {
    const selector = '[id="searchTerm"]';
    await page.goto('http://zero.webappsecurity.com/');
    await page.waitForSelector(selector);
    await page.focus(selector);
    await page.keyboard.type('Hello world', { delay: 100 });
    await page.keyboard.press('Enter');
    await page.waitForSelector('.row-divider');
    const url = await page.url();
    expect(url).to.contains('Hello+world');
  });
});
