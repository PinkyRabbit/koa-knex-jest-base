const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    data: 'Sending some JSON',
  };
});
app.use(router.routes());

app.use((ctx) => {
  ctx.status = 404;
});

module.exports = app;
