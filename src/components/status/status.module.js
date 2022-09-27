const router = require('express').Router();
const { makeExpressCallback } = require('@middlewares');

const StatusController = require('./status.controller');

const routes = require('./status.routes')({
  router,
  StatusController,
  makeExpressCallback,
});

module.exports = {
  StatusRoutes: routes,
};
