const puppeteer = require("puppeteer");
const config = require("../configs/pptr.conf");
const helpers = new (require("../utils/helpers"))();
const chai = require("chai");
const {navigator, handler} = require("../utils/helpers");
const expect = chai.expect;

const googleUrl = "https://www.google.com.ua/";
let browser,
  page = null;

describe("Check simple actions", () => {
  before(async () => {
    browser = await puppeteer.launch(config);
    page = await browser.newPage();
  });

  after(async () => await browser.close());

  it("should open the browser", async () => {
    await helpers.navigateTo(page, "demos");
    expect(await page.url()).to.contain("demos");
  });

  it("should go backward", async () => {
    await page.goto(googleUrl);
    await page.waitForSelector("[aria-label='Search']");
    await page.goBack();
    expect(await page.url()).to.contain("demos");
  });

  it("should go forward", async () => {
    await page.goForward();
    await page.waitForSelector("[aria-label='Search']");
    expect(await page.url()).to.contain("google");
  });

  it("should type text", async () => {
    await helpers.navigateTo(page, "autocomplete");
    const frame = await helpers.handler(page);
    await frame.type(".ui-autocomplete-input", "bla-bla", { delay: 10 });
  });

  it("should click button", async () => {
    await helpers.navigateTo(page, "button");
    const frame = await helpers.handler(page);
    await frame.click(".widget button.ui-button", { clickCount: 1 });
  });

  it("should check checkboxradio", async () => {
    await helpers.navigateTo(page, "checkboxradio");
    const frame = await helpers.handler(page);
    await frame.click('[for="radio-1"]', { clickCount: 1 });
    await frame.waitFor(1000);
    const attr = await frame.evaluate(`document.querySelector("[for='radio-1']").getAttribute("class")`);
    expect(attr).to.contain("ui-checkboxradio-checked");
  });

  it('should choose option in dropdown', async() => {
    await helpers.navigateTo(page, "selectmenu");
  });
});
