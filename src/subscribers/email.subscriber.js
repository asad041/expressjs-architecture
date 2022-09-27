const config = require('config');

const EMAIL_EVENTS = config.get('EMAIL_EVENTS');

const EmailSubscriber = {
  log: (emailType) =>
    console.log(`email:${emailType} at ${Date.now()} => ${new Date()}`),

  triggerEvent: (emitter) => {
    emitter.on(EMAIL_EVENTS.WELCOME, EmailSubscriber.welcome);
  },

  welcome: async () => {
    EmailSubscriber.log('welcome');

    /**
     * TODO:
     * code for email
     */
  },
};

module.exports = EmailSubscriber;
