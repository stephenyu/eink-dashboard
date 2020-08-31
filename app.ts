const puppeteer = require('puppeteer');
import { getSsr } from 'web/ssr';

const flavor = process.argv[2];
const path = "./build/image.png";

(async () => {
  const html = await getSsr();

  let puppeteerArgs: {args: string[], executablePath?: string} = {
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage'
    ],
  };

  if (flavor === 'prod') {
    puppeteerArgs = { ...puppeteerArgs, executablePath: '/usr/bin/google-chrome-stable' };
  }

  const browser = await puppeteer.launch(puppeteerArgs);

  const browserVersion = await browser.version();
  console.log(`Started ${browserVersion}`);

  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 300 });
  await page.setContent(html);
  await page.screenshot({ path });
  await browser.close();
})();
