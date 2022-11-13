const Twilio = require('@services/twilio.service');
const UserProvider = require('./user.provider');

const UserController = {
  getUser: async (httpRequest) => {
    const { _userId } = httpRequest.params;
    const userDto = UserProvider.dummyUserDto({ _userId });

    return {
      statusCode: 200,
      body: { userDto },
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
