const  puppetter = require("puppeteer");

describe("Check jquery demo page", () => {
  it("should open the browser", async () => {
    const browser = await puppetter.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://jqueryui.com/demos/");
    await page.waitForSelector('[id="content"]');
    await browser.close();
  });
});
