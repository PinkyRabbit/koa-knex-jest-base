const supertest = require('supertest-koa-agent');

const db = require('../../app/db');
const app = require('../../index');

const fakeUsers = require('../mocks/users');

describe('API: Auth', () => {
  beforeEach(async () => {
    await db.clean();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('Should register a new user', async () => {
    const fakeUser = fakeUsers[0];
    const response = await supertest(app)
      .post('/api/users')
      .send(fakeUser)
      .expect(200);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).not.toEqual(fakeUser.password);
  });
});
