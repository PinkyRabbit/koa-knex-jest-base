const bcrypt = require('bcrypt');

module.exports.hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(12);
  user.password = bcrypt.hashSync(user.password, salt);
  return user;
}
