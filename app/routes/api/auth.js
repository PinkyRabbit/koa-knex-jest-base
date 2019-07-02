const {
  authEmail,
  generateToken,
  isAuthenticated,
} = require('../../lib/auth');

module.exports = (router) => {
  router
    .get('/auth/is-authenticated', isAuthenticated(), prepareResponseForIsAuthenticated)
    .post('/auth/login', authEmail, generateToken);
    // .get('/auth/logout', logout());
    // .post('/auth/forgot-password', forgotPassword);
};

async function prepareResponseForIsAuthenticated(ctx) {
  const { user } = ctx.state;

  ctx.status = 200;
  ctx.body = user;
}
