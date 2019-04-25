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

    const user = await knex("users")
      .where({
        email
      })
      .first();

    if (!user) {
      return (ctx.status = 401);
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (correctPassword) {
      return (ctx.body = {
        token: generateAuthToken(user.id)
      });
    }

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
