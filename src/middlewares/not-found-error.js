const { NotFoundError } = require('@utils/api-error');

module.exports = async (req) => {
  const errorMessage = `Not Found: ${req.method} on ${req.url}`;
  throw new NotFoundError(errorMessage);
};
