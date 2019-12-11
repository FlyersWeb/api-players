import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";

import { getPlayers, getPlayerById } from "./players";

const app = new Koa();
const router = new Router();

router
  .get("/players", async (ctx, next) => {
    ctx.body = await getPlayers();
  })
  .get("/players/:id", async (ctx, next) => {
    const playerId = ctx.params.id;
    const player = await getPlayerById(playerId);

    if (!player) {
      ctx.status = 404;
      ctx.type = "application/json";
      ctx.body = "";
    } else {
      ctx.status = 200;
      ctx.type = "application/json";
      ctx.body = player;
    }
  });

const server = app
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

export default server