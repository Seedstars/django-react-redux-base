require('babel-core/register');

const config   = require('./webpack/config')['default'];
module.exports = require('./webpack/' + config.get('env'));
