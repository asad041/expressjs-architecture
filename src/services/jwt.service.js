const config = require('config');
const JWT = require('jsonwebtoken');

const JWTService = {
  SECRET_KEY: config.get('JWT.SECRET_KEY'),
  EXPIRES_IN: config.get('JWT.EXPIRES_IN'),
  ISSUER: 'yourdomain.com',
  AUDIENCE: config.get('APP_NAME') + ':' + config.get('APP_ENVIRONMENT'),

  /**
   *
   * @param {Object|String} payload data to encrypt
   * @param {String} [key=jwt.SECRET_KEY] jwt secret key
   * @param {String} [issuer=sso] issuer value
   * @param {Number} [expiresIn=jwt.EXPIRES_IN]
   * @returns {String} encrypted data
   */
  encrypt: ({
    payload,
    key = JWTService.SECRET_KEY,
    expiresIn = JWTService.EXPIRES_IN,
  }) => {
    return JWT.sign(payload, key, {
      expiresIn,
      issuer: JWTService.ISSUER,
      audience: JWTService.AUDIENCE,
    });
  },

  /**
   *
   * @param {String} token jwt token
   * @param {String} [key=jwt.SECRET_KEY] jwt secret key
   * @param {Function} callback callback function for the error & decoded data
   */
  verify: ({ token, key = JWTService.SECRET_KEY }, callback) =>
    JWT.verify(
      token,
      key,
      { issuer: JWTService.ISSUER, audience: JWTService.AUDIENCE },
      callback
    ),
};

module.exports = JWTService;
