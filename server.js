/* eslint-disable */
require('module-alias/register');
require('express-async-errors');
/* eslint-enable */

const App = require('./src/app')();

App.run();
