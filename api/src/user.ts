import * as Koa from "koa";

import knex from "./knex";

export async function getUser(ctx: Koa.Context) {
  try {
    const userId = ctx.state.user.id;

    // find user in the DB. User ID is added to state by
    // auth middleware.
    const user = await knex("users")
      .where({
        id: userId
      })
      .select("full_name")
      .first();

    // this should only ever happen if the user has been deleted
    // from the DB after the token was issued
    if (!user) {
      return (ctx.status = 400);
    }

    // return users full name
    ctx.body = {
      fullName: user.full_name
    };
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
}
