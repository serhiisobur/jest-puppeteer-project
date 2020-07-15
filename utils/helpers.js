class Helpers {
  async handler(page) {
    const frameHandle = await page.$('.demo-frame');
    const frame = await frameHandle.contentFrame();
    return frame;
  }

  async navigateTo(page, url) {
    await page.goto(`https://jqueryui.com/${url}/`);
    await page.waitForSelector('.entry-title');
  }

  async getText(context, selector) {
    try {
      await await context.waitForSelector(selector);
      return await context.$eval(selector, (element) => element.textContent);
    } catch (error) {
      throw new Error(`Can not get text from element with selector - ${selector}`);
    }
  }

  async getElementsCount(context, selector) {
    try {
      await context.waitForSelector(selector);
      return await context.$$eval(selector, (element) => element.length);
    } catch (error) {
      throw new Error(`Can not get count of elements with selector - ${selector}`);
    }
  }

  async click(context, selector, count = 1) {
    try {
      await context.waitForSelector(selector);
      await context.click(selector, { clickCount: count });
    } catch (error) {
      throw new Error(`Could not click on selector - ${selector}`);
    }
  }
}

module.exports = Helpers;
