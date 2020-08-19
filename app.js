const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');

const html = fs.readFileSync('./index.html', 'utf8');

nodeHtmlToImage({
  html,
  output: './build/image.png',
})
.then(() => console.log('The image was created successfully!'))
.catch(error => console.log(error))
