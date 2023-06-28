const { EnvironmentPlugin } = require('webpack');
const { config } = require('dotenv');

config({
  path: './prod.env',
});

module.exports = {
  plugins: [new EnvironmentPlugin(['HOST', 'URL', 'WEBSOCKET'])],
};
