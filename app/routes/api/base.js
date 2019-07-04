const { isAuthenticated } = require('../../lib/auth');

module.exports = (router) => {
  router
    .get('/good', getNormal)
    .get('/protected', isAuthenticated(), getProtected);
};

const getNormal = async (ctx) => {
  ctx.body = { data: 'OK' };
  ctx.status = 200;
};

const getProtected = async (ctx) => {
  ctx.body = { data: 'OK' };
  ctx.status = 200;
};
