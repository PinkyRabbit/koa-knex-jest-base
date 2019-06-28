const { Model } = require('objection');

const { passwordProtected } = require('../db/types');

class User extends passwordProtected(Model) {
  static get tableName() {
    return 'users';
  }

  static get hidden() {
    return ['password'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'role'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        role: { type: 'string', minLength: 1, maxLength: 255 },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get timestamp() {
    return true;
  }

  destroy({ paranoid }) {
    return paranoid
      ? this.$query().patch({ deletedAt: new Date().toISOString() })
      : this.$query().del();
  }
}

module.exports = User;
