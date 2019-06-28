const { compose } = require('objection');
const password = require('objection-password');
const visibility = require('objection-visibility').default;
const timestamps = require('objection-timestamps').timestampPlugin;

const modules = {
  normal: compose([
    visibility,
    timestamps({
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }),
  ]),
  passwordProtected: compose([
    password(),
    visibility,
    timestamps({
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }),
  ]),
};

module.exports = modules;
