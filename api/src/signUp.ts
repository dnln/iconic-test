import * as Koa from "koa";
import * as bcrypt from "bcrypt";

import knex from "./knex";

interface SignUpArgs {
  fullName: string;
  email: string;
  password: string;
}

export async function signUp(ctx: Koa.Context) {
  try {
    const { fullName, email, password }: SignUpArgs = ctx.request.body;

    // hash the password for storing in the DB
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // insert new user into DB
    await knex("users").insert({
      full_name: fullName,
      password: passwordHash,
      email
    });

    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}
