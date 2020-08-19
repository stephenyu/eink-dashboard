const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage'
    ]
  });

const page = await browser.newPage();
await page.goto('https://m.cnn.com/');
await page.screenshot({ path: `./build/puppeteer.png` });
await browser.close();
})();


//
// const fs = require('fs');
// const nodeHtmlToImage = require('node-html-to-image');

// const html = fs.readFileSync('./index.html', 'utf8');

// nodeHtmlToImage({
//     html,
//     output: './build/image.png',
//     puppeteerArgs: {
//         args: [
//             // Required for Docker version of Puppeteer
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             // This will write shared memory files into /tmp instead of /dev/shm,
//             // because Docker’s default for /dev/shm is 64MB
//             '--disable-dev-shm-usage'
//         ]
//     }
// })
// .then(() => console.log('The image was created successfully!'))
// .catch(error => console.log(error))
