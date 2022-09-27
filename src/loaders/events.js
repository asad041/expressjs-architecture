const emitter = require('./emitter');
const loadListenersfrom = require('../subscribers');

module.exports = async () => loadListenersfrom(emitter);
