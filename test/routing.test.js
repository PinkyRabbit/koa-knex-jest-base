
const supertest = require('supertest-koa-agent');

const db = require('../app/db');
const app = require('../index');

const apiTest = () => describe('API: Auth', () => {
  beforeEach(async () => {
    await db.clean();
  });

  afterEach(async () => {
    await db.disconnect();
  });

  it('Should return "OK" on non protected route', async () => {
    const response = await supertest(app)
      .get('/api/good')
      .expect(200);

    expect(response.body).toEqual({ data: "OK" });
  });

  it('Should return "401 error" on protected route', async () => {
    await supertest(app)
      .get('/api/protected')
      .expect(401);
  });
  
});

module.exports = apiTest;
