const CustomError = require('./custom-error');

class DuplicateError extends CustomError {
  constructor(message, cause) {
    super(message || 'Duplicate Record', 409, cause);
  }
}

module.exports = DuplicateError;
