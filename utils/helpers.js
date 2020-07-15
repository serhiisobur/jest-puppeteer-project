module.exports = {
  handler: async function (page) {
    const frameHandle = await page.$('.demo-frame');
    const frame = await frameHandle.contentFrame();
    return frame;
  },

  navigateTo: async function (page, url) {
    await page.goto(`https://jqueryui.com/${url}/`);
    await page.waitForSelector('.entry-title');
  },

  getText: async function (context, selector) {
    try {
      await await context.waitForSelector(selector);
      return await context.$eval(selector, (element) => element.textContent);
    } catch (error) {
      throw new Error(`Can not get text from element with selector -${selector}-`);
    }
  },

  getElementsCount: async function (context, selector) {
    try {
      await context.waitForSelector(selector);
      return await context.$$eval(selector, (element) => element.length);
    } catch (error) {
      throw new Error(`Can not get count of elements with selector -${selector}-`);
    }
  },

  click: async function (context, selector, count = 1) {
    try {
      await context.waitForSelector(selector);
      await context.click(selector, {
        clickCount: count,
      });
    } catch (error) {
      throw new Error(`Could not click on selector -${selector}-`);
    }
  },

  typeText: async function (context, selector, text, delayUnit = 0) {
    try {
      await context.waitForSelector(selector);
      await context.type(selector, text, {
        delay: delayUnit,
      });
    } catch (error) {
      throw new Error(`Could not type text into element with selector -${selector}-`);
    }
  },

  waitForText: async function (context, selector, text) {
    try {
      await context.waitForSelector(selector);
      await context.waitForFunction((selector, text) => {
        document.querySelector(selector).innerText.includes(text), {}, selector, text;
      });
    } catch (error) {
      throw new Error(`Text -${text}- not found for selector -${selector}-`);
    }
  },

  shouldNotExist: async function (context, selector) {
    try {
      await context.waitForSelector(selector, {
        hidden: true,
      });
    } catch (error) {
      throw new Error(`Element with selector -${selector}- still present on the page`);
    }
  },

  getAttribute: async function (page, selector, attribute = 'class') {
    try {
      await page.waitForSelector(selector);
      //TODO find solution to pass variable
      return await page.$eval(selector, el => el.getAttribute('class'));
    } catch (error) {
      throw new Error(
        `Element with selector -${selector}- doesn't present on the page or doesn't have attribute -${attribute}-`,
      );
    }
  },
};
