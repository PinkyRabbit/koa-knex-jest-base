const supertest = require('supertest');

const { app, liftUp, letDown } = require('../index');

describe("routes: index", () => {
  beforeAll(async () => {
    await liftUp();
  });

  afterAll(async () => {
    await letDown();
  });

  test("should respond as expected", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body.data).toEqual("Sending some JSON");
  });
});
