const sinon = require('sinon');
const auth = require('@middlewares/auth');
const { JWTService } = require('@services');
const { expect } = require('chai');

describe('Middleware: auth', () => {
  // with default.json jwt secrets
  const authToken = JWTService.encrypt({
    payload: { user: { id: 'user_id', name: 'asad' } },
  });

  const authTokenWithoutUser = JWTService.encrypt({
    payload: { id: 'user_id', name: 'asad' },
  });

  let sandbox = null;
  const next = sinon.stub();
  const res = sinon.stub();
  const req = {
    header: (prop = 'auth-token') => {
      const headerProps = {
        'auth-token': authToken,
      };

      return headerProps?.[`${prop}`];
    },
  };

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  it('should run', async () => {
    await auth(req, res, next);

    expect(next.calledWith()).to.be.true;
  });

  it('should failed without token', async () => {
    const reqWithoutToken = { ...req, header: () => {} };

    try {
      await auth(reqWithoutToken, res, next);
    } catch (err) {
      expect(err).to.have.property('message', 'Authorization failed');
      expect(err).to.have.property('status', 403);
      expect(err).be.instanceof(Error);
    }
  });

  it('should failed with invalid token', async () => {
    const req = {
      header: (prop = 'auth-token') => {
        const headerProps = { 'auth-token': authToken + '_extra_string' };
        return headerProps?.[`${prop}`];
      },
    };

    try {
      await auth(req, res, next);
    } catch (err) {
      expect(err).to.have.property(
        'message',
        'The token you are trying to use is not valid'
      );
      expect(err).to.have.property('status', 400);
      expect(err).be.instanceof(Error);
    }
  });

  it('should failed without decoded user', async () => {
    const req = {
      header: (prop = 'auth-token') => {
        const headerProps = { 'auth-token': authTokenWithoutUser };
        return headerProps?.[`${prop}`];
      },
    };

    try {
      await auth(req, res, next);
    } catch (err) {
      expect(err).to.have.property(
        'message',
        'The token you are trying to use is not valid'
      );
      expect(err).to.have.property('status', 400);
      expect(err).be.instanceof(Error);
    }
  });
});
