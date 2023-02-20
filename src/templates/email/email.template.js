/**
 *
 * @param {String} emailType email-type for different templates
 * @param {Object} data
 * @param {String} data.name
 * @returns {String}
 */
const emailTemplate = (emailType, { name }) => {
  return `
    <h1>Hello ${name},</h1>
    <p>This is an email template.</p>
`;
};

module.exports = emailTemplate;
