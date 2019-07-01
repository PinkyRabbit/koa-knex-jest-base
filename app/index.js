const Koa = require('koa');
const body = require('koa-bodyparser');

const api = require('./routes');

const app = new Koa();

app.use(body({
  enableTypes: ['json', 'form', 'text'],
}));

app.use(api());
app.use((ctx) => {
  ctx.status = 404;
});

module.exports = app;
