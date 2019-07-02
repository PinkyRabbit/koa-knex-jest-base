const User = require('../models/user');

const create = async (body) => {
  const user = await User
    .query()
    .insert(body);

  return user;
};

const getUserForSession = async (where = {}) => {
  const user = await User
    .query()
    .findOne(where)
    .whereNull('deletedAt');

  return user;
};

module.exports = {
  create,
  getUserForSession,
};
