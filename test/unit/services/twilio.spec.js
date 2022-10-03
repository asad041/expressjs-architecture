const sinon = require('sinon');
const Twilio = require('@services/twilio.service');
const { BadRequestError } = require('@utils/api-error');

describe('Services: Twilio', () => {
  it('twilio service is enabled', () => {
    try {
      const isEnabled = Twilio.isEnabled();
      expect(isEnabled).to.be.true;
    } catch (err) {
      expect(err).to.have.property(
        'message',
        'The twilio is service is disabled'
      );
      expect(err).to.have.property('status', 400);
      expect(err).be.instanceof(Error);
    }
  });

  it('send sms failed', async () => {
    try {
      await Twilio.sendSMS({ body: 'message', to: '+974' });
    } catch (err) {
      expect(err).be.instanceof(Error);
    }
  });

  it('send sms success', async () => {
    sinon.stub(Twilio, 'sendSMS').callsFake(() => ({
      sid: 'SMdaeb0c6bc4bc47fb86b3da8b2623c957',
      status: 'accepted',
    }));

    const message = await Twilio.sendSMS({
      body: 'message',
      to: '+97400000000',
    });
    expect(message).to.have.property('status', 'accepted');
    expect(message).to.have.property(
      'sid',
      'SMdaeb0c6bc4bc47fb86b3da8b2623c957'
    );
  });

  it('throw bad request when disabled', () => {
    sinon.stub(Twilio, 'isEnabled').callsFake(() => {
      throw new BadRequestError('disabled');
    });

    try {
      Twilio.isEnabled();
    } catch (err) {
      expect(err).to.have.property('message', 'disabled');
      expect(err).to.have.property('status', 400);
      expect(err).be.instanceof(Error);
    }
  });
});
