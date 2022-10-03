/**
 *
 * @param {Object} UserRouter
 * @param {ExpressRouter} UserRouter.router
 * @param {UserController} UserRouter.UserController
 * @param {makeExpressCallback} UserRouter.makeExpressCallback
 * @returns {ExpressRouter}
 */
module.exports = ({ router, UserController, makeExpressCallback }) => {
  router.get('/single/:_userId', makeExpressCallback(UserController.getUser));

  router.post(
    '/phone_number',
    makeExpressCallback(UserController.authPhoneNumber)
  );

  return router;
};
