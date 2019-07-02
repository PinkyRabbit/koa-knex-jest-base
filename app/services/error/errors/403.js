class Error403 extends Error {
  constructor(message = 'Forbidden: Access denied.') {
    super(message);
    this.statusCode = 403;
    this.status = 403;
    this.message = message;
  }

  get name() {
    return 'Error403';
  }
}

module.exports = Error403;
