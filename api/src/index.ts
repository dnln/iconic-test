import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";

import router from "./router";

const app = new Koa();

app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST"],
    allowHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(3002, () =>
  console.log("Server listening on http://localhost:3002")
);

export default server;
