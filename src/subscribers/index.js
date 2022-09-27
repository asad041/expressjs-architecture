const loggerSub = require('./logger.subscriber');
const EmailSubscriber = require('./email.subscriber');

// events listener
module.exports = (emitter) => {
  emitter.on('log:message', loggerSub());
  EmailSubscriber.triggerEvent(emitter);

  return emitter;
};
