class Error400 extends Error {
  constructor(message = 'Bad request: parameters are missing or invalid.') {
    super(message);
    this.statusCode = 400;
    this.status = 400;
    this.message = message;
  }

  get name() {
    return 'Error400';
  }
}

module.exports = Error400;
