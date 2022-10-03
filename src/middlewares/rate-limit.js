const rateLimit = require('express-rate-limit');

const defaultConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

module.exports = ({ ...override }) =>
  rateLimit({ ...defaultConfig, ...override });

// Apply the rate limiting middleware to API calls only
// app.use('/api', apiLimiter)
