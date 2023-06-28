const { EnvironmentPlugin } = require('webpack');
const { config } = require('dotenv');

config({
  path: './.env',
});

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'HOST',
      'URL',
      'WEBSOCKET',
      'NODE_TLS_REJECT_UNAUTHORIZED',
    ]),
  ],
};
