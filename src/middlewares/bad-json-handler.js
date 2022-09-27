const { BadRequestError } = require('@utils/api-error');

module.exports = async (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    throw new BadRequestError(err.message);
  }

  return next();
};
