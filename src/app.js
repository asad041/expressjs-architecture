const express = require('express');
const http = require('http');
const cors = require('cors');

const {
  busy,
  badJsonHandler,
  errorHandler,
  notFoundHandler,
} = require('@middlewares');

const { initConfig, events, routes } = require('./loaders');

module.exports = () => {
  const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);
  const app = express();

  async function run() {
    init();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`novalabs app server listening on port:${PORT}`);
    });
  }

  function init() {
    app.on('error', (error) => {
      console.log(error);
      //   logger.error('Unexpected API error', { error });
    });

    // too busy middleware
    app.use(busy);

    app.use(cors());
    app.use(express.json({ extended: false }));
    // app.use(useragent.express());
    app.use(badJsonHandler);

    // loads required configuration, events and routes
    initConfig();
    events();
    routes(app);

    // error middleware
    app.use(notFoundHandler); // handle 404 not found error
    app.use(errorHandler.errorLogger);
    app.use(errorHandler.errorResponder);
  }

  return {
    run,
  };
};
