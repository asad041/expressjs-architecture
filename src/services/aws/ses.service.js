const config = require('config');
const AWS = require('aws-sdk');
const { convert } = require('html-to-text');
const template = require('@templates/email/email.template');

const AWS_SES = config.get('AWS_SES');
const APP_NAME = config.get('APP_NAME');

const { ACCESS_KEY_ID, SECRET_ACCESS_KEy, REGION, SENDER_EMAIL, IS_ENABLED } =
  AWS_SES;

const SESService = {
  updateConfig: () => {
    AWS.config.update({
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEy,
      region: REGION,
    });
  },

  /**
   *
   * @param {String} emailType see list of available emails from email/templates
   * @param {String} receiverEmail it must has all the required of props of the email type
   * @param {String} subject
   * @param {Object} data
   * @returns
   */
  send: async ({ emailType, receiverEmail, subject, data }) => {
    if (!IS_ENABLED) {
      console.log({ service: 'email', isOperational: IS_ENABLED, data });
      return true;
    }

    SESService.updateConfig();

    const ses = new AWS.SES({ apiVersion: '2010-12-01' });
    const body = template(emailType, data);
    const params = {
      Destination: {
        ToAddresses: [receiverEmail], //[req.body.email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
          Text: {
            Charset: 'UTF-8',
            Data: convert(body, { wordwrap: 130 }), // 'Sign-up Verification',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${subject}`, //Email Address Verification`,
        },
      },
      Source: APP_NAME + SENDER_EMAIL,
    };

    try {
      return await ses.sendEmail(params).promise();
    } catch (e) {
      console.log('aws ses: ', e.message);
    }
  },
};

module.exports = SESService;
