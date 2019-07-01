module.exports = (router) => {
  router
    .get('/', getPrefixed);
};

const getPrefixed = async (ctx) => {
  ctx.body = 'OK';
  ctx.status = 200;
};
