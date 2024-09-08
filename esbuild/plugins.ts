// ./esbuild/plugins.ts

import { Plugin } from 'esbuild';
import { definePlugin } from 'esbuild-plugin-define';
import { config } from 'dotenv';

const { PROD } = process.env;
if (PROD !== 'true') {
  config({
    path: './.env',
  });
} else {
  config({
    path: './prod.env',
  });
}

// Define the plugin function as an esbuild plugin
const EnvPlugin: Plugin = definePlugin({
  process: {
    env: {
      URL: process.env.URL,
      BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
      HOST: process.env.HOST || '',
      WEBSOCKET: process.env.WEBSOCKET || '',
      NODE_TLS_REJECT_UNAUTHORIZED:
        process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0',
    },
  },
});

export default EnvPlugin;
