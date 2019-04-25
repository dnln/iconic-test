import * as Koa from "koa";

// simple login body validator
export function validateLogin(ctx: Koa.Context, next: Function) {
  const { email, password } = ctx.request.body;

  if (!email || !password) {
    return (ctx.status = 400);
  }

  return next(ctx.request.body);
}

// simple sign up body validator
export function validateSignUp(ctx: Koa.Context, next: Function) {
  const { fullName, email, password } = ctx.request.body;

  if (!fullName || !email || !password) {
    return (ctx.status = 400);
  }

  return next(ctx.request.body);
}
