import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync, readFileSync } from 'fs';
import { Express } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const domino = require('domino');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const template = readFileSync(path.join('dist/browser', 'index.html')).toString();
const win = domino.createWindow(template);
dotenv.config();

win.Object = Object;
win.Math = Math;

// tslint:disable-next-line
global['window'] = win;
// tslint:disable-next-line
global['document'] = win.document;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
// The Express app is exported so that it can be used by serverless Functions.
const server: Express = express();
server.use(helmet({
  hsts: true,
  hidePoweredBy: true,
  contentSecurityPolicy: false
}));
const distFolder = join(process.cwd(), 'dist/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
server.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule
  })
);
server.set('view engine', 'html');
server.set('views', distFolder);

// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });
// Serve static files from /browser
server.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
server.get('*', (req, res) => {
  res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});
server.set('port', process.env.PORT || 4000);
server.listen(server.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(`Node Express server listening on port ${server.get('port')}`);
});
export * from './src/main.server';
