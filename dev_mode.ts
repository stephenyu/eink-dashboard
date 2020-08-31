const http = require('http');
const fs = require('fs');
const { html, styles } = require('web/ssr');

const indexHtml = fs.readFileSync('./src/html/index.html', 'utf8');

http.createServer(function(request:any, response:any) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.end(indexHtml.replace('<%= HTML %>', html).replace('<%= CSS %>', styles));
}).listen(3000);

console.log("Server accessible via: http://localhost:3000/");
