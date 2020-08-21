const fs = require('fs');
const puppeteer = require('puppeteer');

const html = fs.readFileSync('./index.html', 'utf8');
const js = fs.readFileSync('./dashboard.js', 'utf8');

const flavor = process.argv[2];

(async () => {
    let puppeteerArgs = {
        args: [
            // Required for Docker version of Puppeteer
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // This will write shared memory files into /tmp instead of /dev/shm,
            // because Docker’s default for /dev/shm is 64MB
            '--disable-dev-shm-usage'
        ],
    }

    if (flavor === 'prod') {
        puppeteerArgs = {...puppeteerArgs, executablePath: '/usr/bin/google-chrome-stable'};
    }

    const browser = await puppeteer.launch(puppeteerArgs);

    const browserVersion = await browser.version()
    console.log(`Started ${browserVersion}`)

    const page = await browser.newPage();
    await page.setViewport({ width: 400, height: 300});
    await page.setContent(html.replace('@INJECT', js));
    await page.screenshot({ path: `./build/image.png` });
    await browser.close();
})();
