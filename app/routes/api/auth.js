module.exports = (router) => {
  router
    // .get('/auth/is-authenticated', isAuthenticated(), prepareResponseForIsAuthenticated)
    .post('/auth/login', authEmail, generateToken());
    // .get('/auth/logout', logout());
    // .post('/auth/forgot-password', forgotPassword);
};
