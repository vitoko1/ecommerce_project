class ErrorHandler extends Error {
  constructor(message, statusCode) {
    console.log("inside error Handler")
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.contructor);
  }
}

module.exports = ErrorHandler;
