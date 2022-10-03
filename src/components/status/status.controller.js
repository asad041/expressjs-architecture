const config = require('config');
const pack = require('../../../package.json');

const StatusController = {
  /**
   * Handle app status
   * @async
   * @method
   * @returns {Promise.<ControllerResponse> }
   */
  appStatus: async () => {
    const data = {
      status: 'healthy',
      appName: config.get('APP_NAME'),
      environment: config.get('APP_ENVIRONMENT'),
      version: pack.version,
      time: new Date(),
    };

    return {
      statusCode: 200,
      body: data,
    };
  },
};

module.exports = StatusController;
