
const supertest = require('supertest-koa-agent');

const db = require('../app/db');
const app = require('../index');

describe('API: Auth', () => {
  beforeEach(async () => {
    await db.clean();
  });

  it('Should return "OK" on non protected route', async () => {
    const response = await supertest(app)
      .get('/api/good')
      .expect(200);

    expect(response.body).toEqual({ data: "OK" });
  });
});
