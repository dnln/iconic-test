import * as Koa from "koa";

import knex from "./knex";

export async function getUser(ctx: Koa.Context) {
  try {
    const userId = ctx.state.user.id;

    const user = await knex("users")
      .where({
        id: userId
      })
      .select("full_name")
      .first();

    if (!user) {
      return (ctx.status = 400);
    }

    ctx.body = {
      fullName: user.full_name
    };
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}
