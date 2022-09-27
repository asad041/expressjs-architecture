const {
  APIError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  AccessDeniedError,
  InternalServerError,
  MethodNotAllowedError,
  UnProcessableEntityError,
  UnhandleServerError,
  UnSupportedMediaTypeError,
} = require('@utils/api-error');

describe('Utils: APIError', () => {
  it('throw error', () => {
    let throwError = false;

    try {
      throw new APIError(500, 'server error');
    } catch (err) {
      throwError = err;
      expect(err).to.have.property('message', 'server error');
      expect(err).to.have.property('status', 500);
    }

    expect(throwError).be.instanceof(Error);
  });

  it('throw bad request', () => {
    try {
      throw new BadRequestError();
    } catch (err) {
      expect(err).to.have.property('message', 'Bad Request');
      expect(err).to.have.property('status', 400);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw bad request with custom message', () => {
    let throwError = false;

    try {
      throw new BadRequestError('bad request');
    } catch (err) {
      throwError = err;
      expect(err).to.have.property('status', 400);
      expect(err).to.have.property('message', 'bad request');
    }

    expect(throwError).be.instanceof(Error);
  });

  it('throw access denied', () => {
    try {
      throw new AccessDeniedError();
    } catch (err) {
      expect(err).to.have.property('message', 'Access denied');
      expect(err).to.have.property('status', 401);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw un-authorized', () => {
    try {
      throw new UnauthorizedError();
    } catch (err) {
      expect(err).to.have.property('message', 'Unauthorized');
      expect(err).to.have.property('status', 403);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw forbidden', () => {
    try {
      throw new ForbiddenError();
    } catch (err) {
      expect(err).to.have.property('message', 'Forbidden');
      expect(err).to.have.property('status', 403);
      expect(err).be.instanceof(Error);
    }
  });
  it('throw forbidden', () => {
    try {
      throw new ForbiddenError();
    } catch (err) {
      expect(err).to.have.property('message', 'Forbidden');
      expect(err).to.have.property('status', 403);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw not found', () => {
    try {
      throw new NotFoundError();
    } catch (err) {
      expect(err).to.have.property('message', 'Not Found');
      expect(err).to.have.property('status', 404);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw method not allowed', () => {
    try {
      throw new MethodNotAllowedError();
    } catch (err) {
      expect(err).to.have.property('message', 'Method Not Allowed');
      expect(err).to.have.property('status', 405);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw conflict', () => {
    try {
      throw new ConflictError();
    } catch (err) {
      expect(err).to.have.property('message', 'Conflict');
      expect(err).to.have.property('status', 408);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw unsupported media type', () => {
    try {
      throw new UnSupportedMediaTypeError();
    } catch (err) {
      expect(err).to.have.property('message', 'Unsupported Media Type');
      expect(err).to.have.property('status', 415);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw unprocessable entity', () => {
    try {
      throw new UnProcessableEntityError();
    } catch (err) {
      expect(err).to.have.property('message', 'Unprocessable Entity');
      expect(err).to.have.property('status', 422);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw internal server', () => {
    try {
      throw new InternalServerError();
    } catch (err) {
      expect(err).to.have.property('message', 'Internal Server Error');
      expect(err).to.have.property('status', 500);
      expect(err).be.instanceof(Error);
    }
  });

  it('throw unhandle server', () => {
    try {
      throw new UnhandleServerError();
    } catch (err) {
      expect(err).to.have.property('message', 'Internal Server Error');
      expect(err).to.have.property('status', 503);
      expect(err).be.instanceof(Error);
    }
  });
});
