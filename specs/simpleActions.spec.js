const puppeteer = require("puppeteer");
const config = require("../configs/pptr.conf");
const url = require("../utils/navigator");
const chai = require("chai");

const expect = chai.expect;

const googleUrl = "https://www.google.com.ua/";
let browser = null;
let page = null;

describe("Check simple actions", () => {
  before(async () => {
    browser = await puppeteer.launch(config);
    page = await browser.newPage();
  });

  after(async () => await browser.close());

  it("should open the browser", async () => {
    await page.goto(url("demos"));
    await page.waitForSelector("[id='content']");
    expect(await page.url()).to.equal(url("demos"));
  });

  it("should go backward", async () => {
    await page.goto(googleUrl);
    await page.waitForSelector("[aria-label='Search']");
    await page.goBack();
    expect(await page.url()).to.equal(url("demos"));
  });

  it("should go forward", async () => {
    await page.goForward();
    await page.waitForSelector("[aria-label='Search']");
    expect(await page.url()).to.contain("google");
  });

  it("should type text", async () => {
    await page.goto(url("autocomplete"));
    await page.waitForSelector(".demo-list");
    const frameHandle = await page.$(".demo-frame");
    const frame = await frameHandle.contentFrame();
    await frame.type(".ui-autocomplete-input", "bla-bla", { delay: 10 });
  });
});
