import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";

import router from "./router";

const app = new Koa();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3002, () => console.log("Server listening on 3002"));
