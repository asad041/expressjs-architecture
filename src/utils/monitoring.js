const toobusy = require('toobusy-js');
// const logger = require('../modules/logger');

toobusy.maxLag(600);

toobusy.interval(2000);

toobusy.onLag((currentLag) => {
  // logger.warn('too_busy', { currentLag }); // codecov:ignore:this -- ignores this line
  console.log({ message: 'too_busy', currentLag });
});

module.exports = {
  toobusy,
};
