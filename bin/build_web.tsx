import * as ReactDOMServer from 'react-dom/server';
import * as React from 'react';

import { Dashboard } from 'web/dashboard';

export const dashboard = ReactDOMServer.renderToStaticMarkup(<Dashboard />);
console.log(dashboard);
