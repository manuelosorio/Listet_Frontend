import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import {environment} from './src/environments/environment';

const domino = require('domino');
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join('dist/browser', 'index.html')).toString();
const win = domino.createWindow(template);
const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator(environment.url, {
  stripQuerystring: false,
  lastMod: true,
  filepath: './dist/browser/assets/sitemap.xml'
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
});
generator.on('error', (err) => {
  console.error(err);
});
// start the crawler
generator.start();
win.Object = Object;
win.Math = Math;
global['window'] = win;
global['document'] = win.document;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = environment.production ? '1' : '0';
// The Express app is exported so that it can be used by serverless Functions.

  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

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
    console.log(`Node Express server listening on port ${server.get('port')}`);
  });

export * from './src/main.server';
