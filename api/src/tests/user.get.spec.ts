import * as supertest from "supertest";
import * as jwt from "jsonwebtoken";

import server from "../index";
import knex from "../knex";
import config from "../config";

// close the server after each test
afterEach(async () => {
  await server.close();
});

describe("GET user", () => {
  it("should respond with 401 if there is no JWT attached to the request", async () => {
    const response = await supertest(server).get("/user");
    expect(response.status).toEqual(401);
  });

  it("should respond with 401 if the signature on the JWT isn't valid", async () => {
    // no signature
    const invalidToken = jwt.sign({}, "test");

    const response = await supertest(server)
      .get("/user")
      .set("Authorization", invalidToken);

    expect(response.status).toEqual(401);
  });

  it("should respond with 200 and a user if the JWT is valid", async () => {
    const [userId] = await knex("users").insert({
      full_name: "Testy McTesterson",
      email: "blah@blah.com",
      password: "123"
    });

    const validToken = jwt.sign({ userId }, config.auth.secret);

    const response = await supertest(server)
      .get("/user")
      .set("Authorization", validToken);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ fullName: "Testy McTesterson" });
  });
});
