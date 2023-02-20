const SESService = require('@services/aws/ses.service.js');

describe('Services: AWS-SES', () => {
  it('Send email via AWS-SES', async () => {
    const isSent = await SESService.send({
      emailType: '',
      receiverEmail: 'asad@novalabs-qa.com',
      subject: 'Test email',
      data: { name: 'asad' },
    });
    expect(isSent).to.have.property('MessageId');
    expect(isSent).to.have.property('ResponseMetadata');
  });
});
