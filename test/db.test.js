const db = require('../app/db');

describe('Database:knex', () => {
  beforeAll(async () => {
    await db.init();
  });

  test('fake test', () => {});

  afterAll(async () => {
    await db.disconnect();
  });
});
