class Error404 extends Error {
  constructor(message = 'Not found: The requested URL was not found on this website') {
    super(message);
    this.statusCode = 404;
    this.status = 404;
    this.message = message;
  }

  get name() {
    return 'Error404';
  }
}

module.exports = Error404;
