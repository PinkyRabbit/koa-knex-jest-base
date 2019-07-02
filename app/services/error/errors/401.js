class Error401 extends Error {
  constructor(message = 'Unauthorized: Authorization Required') {
    super(message);
    this.statusCode = 401;
    this.status = 401;
    this.message = message;
  }

  get name() {
    return 'Error401';
  }
}

module.exports = Error401;
