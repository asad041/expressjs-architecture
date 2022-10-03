const Twilio = require('@services/twilio.service');

const UserController = {
  getUser: async (httpRequest) => {
    const { _userId } = httpRequest.params;

    return {
      statusCode: 200,
      body: { user: { _id: _userId, name: 'Doe', email: 'doe-555@gmail.com' } },
    };
  },

  authPhoneNumber: async (httpRequest) => {
    const message = await Twilio.sendSMS({
      body: 'Your verification code is: 123456',
      to: '+97477113158',
    });
    return {
      statusCode: 200,
      body: { message, path: httpRequest.path },
    };
  },
};

module.exports = UserController;
