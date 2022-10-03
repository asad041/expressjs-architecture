const sinon = require('sinon');
const auth = require('@middlewares/auth');
const { expect } = require('chai');

describe('Middleware: auth', () => {
  // with default.json jwt secrets
  const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6Il91c2VySWQxMjM0In0sImlhdCI6MTY2NDc5ODkzNCwiZXhwIjoxNjY4Mzk4OTM0LCJhdWQiOiJub3ZhbGFiczpkZXZlbG9wbWVudCIsImlzcyI6InlvdXJkb21haW4uY29tIn0.MqCQDYwaz9eqQdHrPCNqjIED604buIxI-lrnv6O6dis`;
  const authTokenWithoutUser = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoidXNlcl9pZCIsIm5hbWUiOiJkb2UiLCJpYXQiOjE2NjE5NjY1NDIsImV4cCI6MTY2NTU2NjU0MiwiYXVkIjoiTm92YWxhYnM6ZGV2ZWxvcG1lbnQiLCJpc3MiOiJ5b3VyZG9tYWluLmNvbSJ9.TBOQIasEPNITH40E5rs6OF3Qw0EwQ4D7AhiHisZDa7M`;
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
