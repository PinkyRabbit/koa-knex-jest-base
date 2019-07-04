const Koa = require('koa');
const body = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-session');

const api = require('./routes');
const auth = require('./lib/auth');
const config = require('./config/session');

const app = new Koa();

app.use(body({
  enableTypes: ['json', 'form', 'text'],
}));

app.keys = ['key123'];
app.use(session({
  key: config.cookieName,
  maxAge: config.cookieMaxAge,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false,
}, app));

app.use(auth());
app.use(passport.session());
app.use(api());
app.use((ctx) => {
  ctx.status = 404;
});

module.exports = app;
