import * as Koa from "koa";
import * as jwt from "jsonwebtoken";

import config from "./config";

export function checkAuth(ctx: Koa.Context, next: Function) {
  try {
    const authHeader = ctx.request.headers.authorization;

    if (!authHeader) {
      return (ctx.status = 401);
    }

    const token = ctx.request.headers.authorization.replace("Bearer ", "");

    if (!token) {
      return (ctx.status = 401);
    }

    // TODO: fix JWT type
    const verifiedToken: any = jwt.verify(token, config.auth.secret);

    // TODO: check user ID exists on token

    ctx.state.user = {
      id: verifiedToken.userId
    };

    return next();
  } catch (err) {
    if (err.message === "invalid signature") {
      return (ctx.status = 401);
    }

    return (ctx.status = 500);
  }
}
