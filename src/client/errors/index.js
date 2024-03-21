const BadRequestError = require('./bad-request');
const CustomError = require('./custom-error');
const DuplicateError = require('./duplicate');
const ForbiddenError = require('./forbidden');
const InternalServerError = require('./internal-server');
const NotFoundError = require('./not-found');
const UnauthorizedError = require('./unauthorized');

module.exports = {
    BadRequestError,
    CustomError,
    DuplicateError,
    ForbiddenError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError
};