const LocalStrategy = require('passport-local').Strategy;
const { getUserForSession } = require('../../../entities/user');

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const handler = async (req, email, password, done) => {
  try {
    const user = await getUserForSession({ email });

    if (!user || !(await user.verifyPassword(password))) {
      return done(null, false, { message: 'failed to authenticate...' });
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

module.exports = new LocalStrategy(options, handler);
