const CustomError = require('./custom-error');

class BadRequestError extends CustomError {
  constructor(message, cause) {
    super(message || 'Bad Request', 400, cause);
  }
}

module.exports = BadRequestError;
