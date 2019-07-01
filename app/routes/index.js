const Router = require('koa-router');
const compose = require('koa-compose');

const routingUtils = require('./../utils/routing');
const base = require('./api/base');
const prefixedRoute = require('./api/prefixedRoute');

const routes = [
  base,
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
