const crypto = require('crypto');

const utils = {
  noop: () => 0,

  wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  times: (n) => (f) => {
    const iter = (i) => {
      if (i === n) return;
      f(i);
      iter(i + 1);
    };
    return iter(0);
  },

  isTrue(b) {
    return b === true || b === 'true';
  },

  isBoolean(b) {
    return typeof b == 'boolean';
  },

  capitalize: (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  },

  hmac: (key, payload) => {
    return crypto
      .createHmac('sha256', Buffer.from(key, 'utf-8'))
      .update(payload)
      .digest()
      .toString('base64');
  },

  /**
   *
   * @param {Number} [length=64] length of the token string
   * @returns unique string
   */
  randomToken: (length = 64) => crypto.randomBytes(length).toString('hex'),

  /**
   * @param {Number} f any length of a number
   * @param {Number} s any length of a number
   * @returns random 6 digit number (default)
   */
  randomDigits: (f = 10000000, s = 90000000) =>
    Math.floor(f + Math.random() * s),

  /**
   *
   * @param {String} [prefix=trans_]
   * @returns {String} unique random ID
   */
  randomID: (prefix = 'trans_') =>
    `${prefix}${utils.randomToken(12)}${utils.randomDigits()}`,
};

module.exports = utils;
