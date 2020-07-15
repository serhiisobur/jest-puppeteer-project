const puppeteer = require('puppeteer');
const config = require('../configs/pptr.conf');
const expect = require('chai').expect;
const { navigateTo, handler, getElementsCount, click, getText, typeText, getAttribute } = require('../utils/helpers');

const url = 'https://github.com/';
const searchField = '[role="search"]';
let browser,
  page = null;

describe('Check simple actions', () => {
  before(async () => {
    browser = await puppeteer.launch(config);
    page = await browser.newPage();
  });

  after(async () => await browser.close());

  it('should open the browser', async () => {
    await navigateTo(page, 'demos');
    expect(await page.url()).to.contain('demos');
  });

  it('should go backward', async () => {
    await page.goto(url);
    await page.waitForSelector(searchField);
    await navigateTo(page, 'demos');
    await page.goBack({
      waitUntil: 'networkidle0',
    });
    expect(await page.url()).to.contain('github');
  });

  it('should go forward', async () => {
    await navigateTo(page, 'demos');
    await page.goto(url);
    await page.waitForSelector(searchField);
    await page.goBack({
      waitUntil: 'networkidle0',
    });
    await page.goForward();
    expect(await page.url()).to.contain('github');
  });

  it('should get page title', async () => {
    await navigateTo(page, 'draggable');
    expect(await page.title()).to.equal('Draggable | jQuery UI');
  });

  it('should type text', async () => {
    await navigateTo(page, 'autocomplete');
    const frame = await handler(page);
    await typeText(frame, '.ui-autocomplete-input', 'bla-bla', 10);
  });

  it('should get text from element', async () => {
    await navigateTo(page, 'button');
    const text = await getText(page, '.entry-title');
    expect(text).to.equal('Button');
  });

  it('should click button', async () => {
    await navigateTo(page, 'button');
    const frame = await handler(page);
    await click(frame, '.widget button.ui-button');
  });

  it.only('should check checkboxradio', async () => {
    await navigateTo(page, 'checkboxradio');
    const frame = await handler(page);
    await click(frame, '[for="radio-1"]');
    await frame.waitFor(1000);
    const attr = await getAttribute(frame, '[for="radio-1"]', 'class');
    expect(attr).to.contain('ui-checkboxradio-checked');
  });

  it('should get corect count of elements', async () => {
    await navigateTo(page, 'selectmenu');
    const frame = await handler(page);
    const count = await getElementsCount(frame, 'select');
    expect(count).to.equal(4);
  });

  it('should wait invisibility of element', async () => {
    const signInBtn = '[id="signin_button"]';
    await page.goto('http://zero.webappsecurity.com/');
    await click(page, signInBtn);
    await page.waitForSelector(signInBtn, {
      hidden: true,
      timeout: 1000,
    });
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
    await page.keyboard.type('Hello world', {
      delay: 100,
    });
    await page.keyboard.press('Enter');
    await page.waitForSelector('.row-divider');
    const url = await page.url();
    expect(url).to.contains('Hello+world');
  });
});
