/**
 *
 * @param {Object} StatusRouter
 * @param {ExpressRouter} StatusRouter.router
 * @param {StatusController} StatusRouter.StatusController
 * @param {makeExpressCallback} StatusRouter.makeExpressCallback
 * @returns {ExpressRouter}
 */
module.exports = ({ router, StatusController, makeExpressCallback }) => {
  router.get('/', makeExpressCallback(StatusController.appStatus));

  return router;
};
