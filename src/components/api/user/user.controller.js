const UserController = {
  getUser: async (httpRequest) => {
    const { _userId } = httpRequest.params;

    return {
      statusCode: 200,
      body: { user: { _id: _userId, name: 'Doe', email: 'doe-555@gmail.com' } },
    };
  },
};

module.exports = UserController;
