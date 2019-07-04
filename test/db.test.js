const db = require('../app/db');

const dbTest = () => describe('Database:knex', () => {
  beforeAll(async () => {
    await db.init();
  });

  test('fake test', () => {});

  afterAll(async () => {
    await db.disconnect();
  });
});

module.exports = dbTest;
