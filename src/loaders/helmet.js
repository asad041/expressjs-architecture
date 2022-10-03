const helmet = require('helmet');

/**
 *
 * @param {expressApp} app
 */
module.exports = (app, isDefault = true) => {
  if (isDefault) {
    app.use(helmet());
    return;
  }

  app.use(helmet.contentSecurityPolicy());
  app.use(helmet.crossOriginEmbedderPolicy());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(helmet.crossOriginResourcePolicy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard()); // Prevent Click Jacking Attack
  app.use(helmet.hidePoweredBy()); // Disable tech-stack from header
  app.use(helmet.hsts()); // Set strict transport security
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter()); // Prevent Cross-site scripting attack
};
