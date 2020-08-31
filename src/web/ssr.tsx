import * as fs from 'fs';
import * as ReactDOMServer from 'react-dom/server';
import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { Dashboard } from 'web/dashboard';
import { getDashboardData } from 'server/main';

export async function getSsr() {
  const sheet = new ServerStyleSheet();
  const indexHtml = fs.readFileSync('./src/html/index.html', 'utf8');
  const dashboardData = await getDashboardData();

  const html = ReactDOMServer.renderToString(sheet.collectStyles(<Dashboard data={dashboardData}/>));
  const styles = sheet.getStyleTags();

  return indexHtml.replace('<%= HTML %>', html).replace('<%= CSS %>', styles);
}
