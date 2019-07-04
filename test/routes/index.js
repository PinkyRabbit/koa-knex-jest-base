const authTest = require('./auth.test');

const routesTests = () => describe('Routing tests:', () => {
   authTest();
});

module.exports = routesTests;
