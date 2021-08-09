import { getSsr } from 'web/ssr';
import * as fs from 'fs';

(async () => {
  const html = await getSsr();
  fs.writeFileSync('./content.html', html);
  console.log('HTML written to content.html');
})();
