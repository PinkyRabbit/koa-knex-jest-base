const UserEntity = require('../../entities/user');

module.exports = (router) => {
  router
    .post(
      '/users',
      create,
    );
};

const create = async (ctx) => {
  const { body } = ctx.request;
  const user = await UserEntity.create(body);

  ctx.body = { user };
  ctx.status = 200;
};
