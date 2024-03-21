const CustomError = require('./custom-error');

class UnauthorizedError extends CustomError {
    constructor(message, cause) {
        super(message || 'Unauthorized', 401, cause);
    }
}

module.exports = UnauthorizedError;