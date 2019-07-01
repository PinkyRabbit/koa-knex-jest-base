const Router = require('koa-router');
const compose = require('koa-compose');

const routingUtils = require('./../utils/routing');
const base = require('./api/base');
const auth = require('./api/auth');
const users = require('./api/users');
const prefixedRoute = require('./api/prefixedRoute');

const routes = [
  base,
  auth,
  users,
  routingUtils.getPrefixedRouter(
    prefixedRoute,
    '/prefixed/:someId/test',
  ),
];

const router = new Router({
  prefix: '/api',
});

const api = () => {
  routes.forEach((route) => {
    route(router);
  });
  return compose([
    router.routes(),
    router.allowedMethods(),
  ]);
};

module.exports = api;
