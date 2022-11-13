const provider = require('@utils/provider');
const { User } = require('@models');

const UserProvider = {
  ...provider(User),

  dummyUserDto: ({ _userId }) => {
    return { _id: _userId, name: 'Doe', email: 'doe-555@gmail.com' };
  },
};

module.exports = UserProvider;
