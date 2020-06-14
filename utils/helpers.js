 const handler = async (page) => {
  const frameHandle = await page.$(".demo-frame");
  const frame = await frameHandle.contentFrame();
  return frame;
}

exports.handler = handler;
