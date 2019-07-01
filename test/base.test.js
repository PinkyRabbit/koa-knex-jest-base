const supertest = require('supertest-koa-agent');

const app = require('../index');
const db = require('../app/db');
// const { liftUp, letDown } = require('./each');

describe("routes: index", () => {
  beforeEach(async () => {
    await db.clean();
  });

  test("should respond as expected", () => {
    expect(true).toBe(true);
  });
});
