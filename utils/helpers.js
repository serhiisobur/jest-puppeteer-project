class Helpers {
  async handler(page) {
    const frameHandle = await page.$(".demo-frame");
    const frame = await frameHandle.contentFrame();
    return frame;
  }

  async navigateTo(page, url) {
    await page.goto(`https://jqueryui.com/${url}/`);
    await page.waitForSelector(".entry-title");
  }

  async getText(context, selector) {
    return context.$eval(selector, (element) => element.textContent);
  }
}

module.exports = Helpers;
