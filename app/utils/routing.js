const Router = require('koa-router');

const getPrefixedRouter = (route, prefix = '') => (router) => {
  const prefixedRouter = new Router({
    prefix,
  });

  route(prefixedRouter);
  router.use(prefixedRouter.routes());
};

module.exports = {
  getPrefixedRouter,
};
