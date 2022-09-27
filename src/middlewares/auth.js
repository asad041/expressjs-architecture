const { JWTService } = require('@services');
const { BadRequestError, UnauthorizedError } = require('@utils/api-error');

module.exports = async function (req, res, next) {
  const token = req.header('auth-token');

  if (!token) {
    throw new UnauthorizedError('Authorization failed');
  }

  JWTService.verify({ token, key: JWTService.SECRET_KEY }, (err, decoded) => {
    if (err) {
      console.log('***** JWT authentication error ****');
      console.log({
        name: err.name,
        message: err.message,
        expiredAt: err?.expiredAt,
      });
      console.log('***** JWT authentication error ****');

      throw new BadRequestError('The token you are trying to use is not valid');
    }

    if (!decoded || !decoded.user) {
      console.log(
        '**** JWT authentication error ****',
        { message: 'Invalid payload' },
        '**** JWT authentication error ****'
      );
      throw new BadRequestError('The token you are trying to use is not valid');
    }

    req.context = {
      ...req.context,
      decodedUser: decoded.user,
    };

    next();
  });
};
