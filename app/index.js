const Koa = require('koa');

const api = require('./routes');

const app = new Koa();

app.use(api());
app.use((ctx) => {
  ctx.status = 404;
});

module.exports = app;
