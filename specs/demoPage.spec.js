const puppetter = require("puppeteer");
const config = require("../configs/pptr.conf");

describe("Check jquery demo page", () => {
  it("should open the browser", async () => {
    const browser = await puppetter.launch(config);
    const page = await browser.newPage();
    await page.goto("https://jqueryui.com/demos/");
    await page.waitForSelector('[id="content"]');
    await browser.close();
  });
});
