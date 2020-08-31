import * as ReactDOMServer from 'react-dom/server';
import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';

import { Dashboard } from 'web/dashboard';

const sheet = new ServerStyleSheet();
export const html = ReactDOMServer.renderToString(sheet.collectStyles(<Dashboard />));
export const styles = sheet.getStyleTags();
