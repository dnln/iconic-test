import * as Koa from "koa";

import router from "./router";

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

app.listen(3002, () => console.log("Server listening on 3002"));
