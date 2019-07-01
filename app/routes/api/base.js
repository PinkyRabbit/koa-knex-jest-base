// const { isAuthenticated } = require('../../../auth');

module.exports = (router) => {
  router
    .get('/good', getNormal);
    // .get('/', isAuthenticated(), getProtected);
};

const getNormal = async (ctx) => {
  ctx.body = { data: 'OK' };
  ctx.status = 200;
};

const getProtected = async (ctx) => {
  ctx.body = { data: 'OK' };
  ctx.status = 200;
};
