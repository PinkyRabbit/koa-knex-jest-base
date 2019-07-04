const baseRoutingTest = require('./routing.test');
const dbTest = require('./db.test');
const routes = require('./routes');

describe('Application tests:', () => {
   dbTest();
   baseRoutingTest();
   routes();
});
