const router = require('express').Router();
const { makeExpressCallback } = require('@middlewares');

const UserController = require('./user.controller');

const routes = require('./user.routes')({
  router,
  UserController,
  makeExpressCallback,
});

module.exports = {
  UserRoutes: routes,
};
