const http = require('http');
import { getSsr } from 'web/ssr';

http.createServer(function(request:any, response:any) {
  getSsr().then(html => {
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.end(html);
  });
}).listen(3000);

console.log("Server accessible via: http://localhost:3000/");
