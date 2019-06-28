const log4js = require('log4js');

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
    },
    email: {
      type: '@log4js-node/smtp',
      recipients: process.env.SUPER_ADMIN_EMAIL,
      sender: `"Best webiste in the world" <${process.env.EMAIL_DELIVERY_EMAIL}>`,
      subject: 'An Error on Your Website',
      sendInterval: 3600,
      transport: {
        service: 'Mail.ru',
        auth: {
          user: process.env.EMAIL_DELIVERY_EMAIL,
          pass: process.env.EMAIL_DELIVERY_PASSWORD,
        },
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'error',
    },
    development: {
      appenders: ['out'],
      level: 'debug',
    },
    production: {
      appenders: ['email'],
      level: 'info',
    },
  },
});

const loggerType = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production'
  ? process.env.NODE_ENV
  : 'default';

const logger = log4js.getLogger(loggerType);

module.exports = logger;
