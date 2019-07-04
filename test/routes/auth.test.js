const supertest = require('supertest-koa-agent');

const db = require('../../app/db');
const app = require('../../index');

const fakeUsers = require('../mocks/users');

const authTests = () => describe('API: Auth', () => {
  beforeEach(async () => {
    await db.clean();
  });

  afterEach(async () => {
    await db.disconnect();
  });

  it('Should be able to register a new user', async () => {
    const fakeUser = fakeUsers[0];
    const response = await supertest(app)
      .post('/api/users')
      .send(fakeUser)
      .expect(200);

    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).not.toEqual(fakeUser.password);
  });

  it('Should be able to login', async () => {
    const fakeUser = fakeUsers[0];
    await supertest(app)
      .post('/api/users')
      .send(fakeUser)
      .expect(200);
    const response = await supertest(app)
      .post('/api/auth/login')
      .send(fakeUser)
      .expect(200);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('Should return user if request is authenticated with cookie', async () => {
    const fakeUser = fakeUsers[0];
    await supertest(app)
      .post('/api/users')
      .send(fakeUser)
      .expect(200);
    const login = await supertest(app)
      .post('/api/auth/login')
      .send(fakeUser)
      .expect(200);

    const cookie = login.header['set-cookie'];

    const response = await supertest(app)
      .get('/api/auth/is-authenticated')
      .set('Cookie', cookie)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).not.toHaveProperty('password');
  });

  /*
  it('Should return user if request is authenticated with token', async () => {
    const fakeUser = fakeUsers[0];
    await supertest(app)
      .post('/api/users')
      .send(fakeUser)
      .expect(200);
    const login = await supertest(app)
      .post('/api/auth/login')
      .send(fakeUser)
      .expect(200);

    const { token } = login.body;

    const response = await supertest(app)
      .get('/api/auth/is-authenticated')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).not.toHaveProperty('password');
  });
  */
});

module.exports = authTests;
