const jwt = require('jsonwebtoken');
const compose = require('koa-compose');
const passport = require('koa-passport');

const { getUserForSession } = require('../../entities/user');
const config = require('../../config/session');
const ErrorService = require('../../services/error');
const emailStrategy = require('./strategies/email');

passport.use('email', emailStrategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserForSession({ id });

    if (user) {
      return done(null, user);
    }

    return done(null, null);
  } catch (error) {
    return done(error);
  }
});

const auth = () => compose([passport.initialize()]);

const authEmail = (ctx, next) => passport.authenticate('email', async (err, user, info) => {
  if (err) {
    ErrorService.throw(401, err);
  }

  if (user) {
    await ctx.login(user);
    await next();
  }

  if (info && info.message) {
    ErrorService.throw(401, info.message);
  }
})(ctx, next);

const generateToken = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 401;
  } else {
    const token = jwt.sign({ id: user.id }, config.secret);

    ctx.status = 200;
    ctx.body = { token, user };
  }
};

const isAuthenticated = () => async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ErrorService.throw(401, 'Failed to authenticate');
  }

  await next();
};

module.exports = auth;
module.exports.authEmail = authEmail;
module.exports.generateToken = generateToken;
module.exports.isAuthenticated = isAuthenticated;
