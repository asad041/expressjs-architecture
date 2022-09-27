const initConfig = require('./init-config');
const routes = require('./routes');
const events = require('./events');
const emitter = require('./emitter');

module.exports = {
  emitter,
  events,
  initConfig,
  routes,
};
