import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { AppServerModule } from './src/main.server';
import { config } from 'dotenv';
import helmet from 'helmet';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync, readFileSync } from 'fs';
import { Express } from 'express';

const domino = require('domino');
const path = require('path');

config();
const distFolder = join(__dirname, '..', 'browser');
const template = readFileSync(
  path.join(distFolder.toString(), 'index.html')
).toString();
const win = domino.createWindow(template);

win.Object = Object;
win.Math = Math;

global.window = win;
global.document = win.document;
process.env.NODE_TLS_REJECT_UNAUTHORIZED =
  process.env.NODE_ENV === 'production' ? '1' : '0';

const server: Express = express();
server.use(
  helmet({
    hsts: true,
    hidePoweredBy: true,
    contentSecurityPolicy: false,
  })
);

const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  ? 'index.original.html'
  : 'index';

server.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule,
  })
);
server.set('view engine', 'html');
server.set('views', distFolder);

// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });
// Serve static files from /browser
server.get(
  '*.*',
  express.static(distFolder, {
    maxAge: '1y',
  })
);

// All regular routes use the Universal engine
server.get('*', (req, res) => {
  res.render(indexHtml, {
    req,
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  });
});
server.set('port', process.env.PORT || 4000);
server.listen(server.get('port'), () => {
  // tslint:disable-next-line:no-console
  console.log(`Node Express server listening on port ${server.get('port')}`);
});
export * from './src/main.server';
