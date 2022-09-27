const config = require('config');

const StatusController = {
  /**
   * Handle app status
   * @async
   * @method
   * @returns {Promise.<ControllerResponse> }
   */
  appStatus: async () => {
    const data = {
      status: 'Healthy',
      appName: config.get('APP_NAME'),
      environment: config.get('APP_ENVIRONMENT'),
      time: new Date(),
    };

    return {
      statusCode: 200,
      body: data,
    };
  },
};

module.exports = StatusController;
