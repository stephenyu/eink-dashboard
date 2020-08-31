import * as ReactDOMServer from 'react-dom/server';
import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { DashboardProps } from 'shared/types';
import { Dashboard } from 'web/dashboard';

const sheet = new ServerStyleSheet();

export function createSsr(dashboardProps: DashboardProps) {
  const html = ReactDOMServer.renderToString(sheet.collectStyles(<Dashboard data={dashboardProps}/>));
  const styles = sheet.getStyleTags();
  return { html, styles };
}
