const config = require('config');

const configProps = [
  'APP_NAME',
  'APP_VERSION',
  'APP_ENVIRONMENT',
  'API_PREFIX',
  'LOGGER_EXECUTION',
  'LOGGER_EXECUTION.ERROR',
  'JWT',
  'JWT.SECRET_KEY',
  'JWT.EXPIRES_IN',
  'MONGO_DB',
  'MONGO_DB.URI',
];

module.exports = () => {
  const notFoundProp = configProps.find((prop) => !config.has(prop));

  if (notFoundProp) {
    throw new Error(`${notFoundProp} not found in the environment`);
  }

  return true;
};
