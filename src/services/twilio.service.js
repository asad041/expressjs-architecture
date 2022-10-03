const config = require('config');
const { BadRequestError } = require('@utils/api-error');

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const { ACCOUNT_SID, AUTH_TOKEN, PHONE_NUMBER, IS_ENABLED } =
  config.get('TWILIO');

const Twilio = {
  isEnabled: () => {
    if (IS_ENABLED) {
      return true;
    }

    throw new BadRequestError('The twilio is service is disabled');
  },

  sendSMS: async ({ body, to, from = PHONE_NUMBER }) => {
    Twilio.isEnabled();

    const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

    const message = await client.messages.create({ body, from, to });

    return message;
  },
};

module.exports = Twilio;
