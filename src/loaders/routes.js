const { API_PREFIX } = require('config');
const { StatusRoutes } = require('@components/status/status.module');
const { UserRoutes } = require('@components/api/user/user.module');

const apiRoutes = [{ path: '/users', routes: UserRoutes }];

/**
 *
 * @param {expressApp} app
 */
module.exports = (app) => {
  // main routes
  app.use('/', StatusRoutes);

  apiRoutes.forEach((api) => {
    app.use(API_PREFIX + api.path, api.routes);
  });
};
