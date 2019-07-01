const User = require('../models/user');

const create = async (body) => {
  const user = await User
    .query()
    .insert(body);

  return user;
};

module.exports = {
  create,
};
