const logger = require('../../lib/logger');

const Error400 = require('./errors/400');
const Error401 = require('./errors/401');
const Error404 = require('./errors/404');
const Error403 = require('./errors/403');

const errors = {
  400: Error400,
  401: Error401,
  403: Error403,
  404: Error404,
};

class ErrorService {
  static handle() {
    return async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        const status = error.statusCode || error.status || 500;
        console.error(status, error.message, error);

        if (status === 500) {
          logger.fatal(error);
        }

        ctx.status = status;
        ctx.body = { error: error.message };
      }
    };
  }

  static throw(code, message = undefined) {
    if (errors[code]) {
      throw new errors[code](message);
    } else {
      throw new Error(message || 'Bad request.');
    }
  }
}

module.exports = ErrorService;
