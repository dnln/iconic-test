import * as Koa from "koa";
import * as jwt from "jsonwebtoken";

import config from "./config";

export function checkAuth(ctx: Koa.Context, next: Function) {
  try {
    const authHeader = ctx.request.headers.authorization;

    if (!authHeader) {
      return (ctx.status = 401);
    }

    // get just the JWT from the Authorization header
    const token = ctx.request.headers.authorization.replace("Bearer ", "");

    if (!token) {
      return (ctx.status = 401);
    }

    // TODO if more time: fix JWT type
    const verifiedToken: any = jwt.verify(token, config.auth.secret);

    ctx.state.user = {
      id: verifiedToken.userId
    };

    return next();
  } catch (err) {
    // jsonwebtoken throws an error if the token is invalid. return
    // unauthorized rather than error if the signature is invalid.
    if (err.message === "invalid signature") {
      return (ctx.status = 401);
    }

    return (ctx.status = 500);
  }
}
