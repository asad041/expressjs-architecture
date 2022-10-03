const config = require('config');
const { BadRequestError } = require('@utils/api-error');

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = config.get('TWILIO.ACCOUNT_SID');
const authToken = config.get('TWILIO.AUTH_TOKEN');
const phoneNumber = config.get('TWILIO.PHONE_NUMBER');

const Twilio = {
  isEnabled: () => {
    if (config.get('TWILIO.IS_ENABLED')) {
      return true;
    }

    throw new BadRequestError('The twilio is service is disabled');
  },

  sendSMS: async ({ body, to, from = phoneNumber }) => {
    Twilio.isEnabled();

    const client = require('twilio')(accountSid, authToken);

    const message = await client.messages.create({ body, from, to });

    return message;
  },
};

module.exports = Twilio;
