const sinon = require('sinon');
const SESService = require('@services/aws/ses.service.js');

describe('Services: AWS-SES', () => {
  it('Send email via AWS-SES', async () => {
    sinon.stub(SESService, 'send').callsFake(() => ({
      ResponseMetadata: { RequestId: '1e25b1f6-5c57-4750-b58f-2a7fc1c73bbb' },
      MessageId: '011201866ebd7f85-1fd237fc-98c9-4f65-b19f-0963e3d75496-000000',
    }));

    const isSent = await SESService.send({
      emailType: '',
      receiverEmail: 'asad@novalabs-qa.com',
      subject: 'Test email',
      data: { name: 'asad' },
    });
    expect(isSent).to.have.property(
      'MessageId',
      '011201866ebd7f85-1fd237fc-98c9-4f65-b19f-0963e3d75496-000000'
    );
    expect(isSent).to.have.property('ResponseMetadata');
  });
});
