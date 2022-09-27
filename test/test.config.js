const path = require('path');

global.srcDir = path.resolve(path.join(__dirname, '../src'));

global.chai = require('chai');
global.expect = global.chai.expect;

// global.chai.use(chaiAsPromised);
// global.chai.use(chaiDateString);
// global.chai.use(chaiXml);

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  debugger; // eslint-disable-line no-debugger

  process.exit(-1); // eslint-disable-line no-process-exit
});
