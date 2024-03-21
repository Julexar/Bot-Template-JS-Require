const CustomError = require('./custom-error');

class ForbiddenError extends CustomError {
    constructor(message, cause) {
        super(message || 'Forbidden', 403, cause);
    }
}

module.exports = ForbiddenError;