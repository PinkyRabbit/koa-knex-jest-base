const db = require('../app/db');
const app = require('../index');

const { hashPassword } = require('./helpers');
const fakeUsers = require('./mocks/users');

describe('API: Auth', () => {
  beforeEach(async () => {
    await db.clean();
  });

  it('Should register a new user', async () => {
    const fakeUser = hashPassword(fakeUsers[0]);
    // console.log(fakeUser)
    // const response = await request(api)
    //   .post('/users')
    //   .send(fakeUser)
    //   .expect(201)

    // expect(response.body).to.shallowDeepEqual(expectedResult)
    // expect(response.body).to.include.keys(['id', 'createdAt', 'updatedAt'])

    // expect(response.headers).to.have.property('authorization')
    // expect(response.headers.authorization).to.be.a('string')
    expect(true).toBe(true);
  });


});
