const config = require('config');
// const { Error: MongooseError } = require('mongoose');
const { APIError } = require('@utils/api-error');

const errorLogger = (err, req, res, next) => {
  if (config.get('LOGGER_EXECUTION.ERROR')) console.error('\x1b[31m', err);
  next(err);
};

// eslint-disable-next-line no-unused-vars
const errorResponder = (err, req, res, next) => {
  // catch api error
  if (err instanceof APIError) {
    return res.status(err.status).send({
      code: err.status,
      message: err.message,
      statusMessage: 'FAILED',
      _customError: true,
      ok: false,
    });
  }

  // catch mongoose validation error
  //   if (err instanceof MongooseError.ValidationError) {
  //     return res.status(err.status || 400).send({
  //       code: err.status || 400,
  //       message: err.message,
  //       statusMessage: 'FAILED',
  //       _customError: true,
  //     });
  //   }

  res.set('Content-Type', 'application/json');
  return res.status(err.status || err.statusCode || 502).send(
    JSON.stringify(
      {
        ...err,
        message:
          err?.description ||
          'Internal server error, please contact support team',
      },
      null,
      4
    )
  ); // pretty print
};

const invalidPathHandler = (req, res) => {
  res.redirect('/error');
};

module.exports = {
  errorLogger,
  errorResponder,
  invalidPathHandler,
};
