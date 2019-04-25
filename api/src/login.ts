import * as Koa from "koa";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import config from "./config";
import knex from "./knex";

interface LoginArgs {
  email: string;
  password: string;
}

export async function login(ctx: Koa.Context) {
  try {
    const { email, password }: LoginArgs = ctx.request.body;

    // find the user in the DB based on the email address
    const user = await knex("users")
      .where({
        email
      })
      .first();

    // return 401 rather than a status that could give away whether
    // the user is exists in the DB or not
    if (!user) {
      return (ctx.status = 401);
    }

    // use bcrypt to verify if the passwords match
    const correctPassword = await bcrypt.compare(password, user.password);

    // return auth token if the password is correct
    if (correctPassword) {
      return (ctx.body = {
        token: generateAuthToken(user.id)
      });
    }

    // invalid password for user
    return (ctx.status = 401);
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}

function generateAuthToken(userId: number) {
  return jwt.sign(
    {
      userId: userId
    },
    config.auth.secret
  );
}
