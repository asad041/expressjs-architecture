// const errors = require('../../helpers/errors');
const Monitoring = require('@utils/monitoring');
const { UnhandleServerError } = require('@utils/api-error');

module.exports = async function (req, res, next) {
  if (Monitoring.toobusy()) {
    throw new UnhandleServerError('Server is too busy right now, sorry');
  } else {
    await next();
  }
};
