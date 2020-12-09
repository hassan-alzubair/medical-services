class ApplicationException extends Error {
    constructor(message, status) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message || 'Something went wrong. Please try again.';
        this.status = status || 500;
        this.code = 0;
    }
}


class InvalidInputException extends ApplicationException {
    constructor() {
        super("invalid input", 400);
    }
}

class UnauthorizedException extends ApplicationException {
    constructor() {
        super("unauthorized", 403);
    }
}

module.exports = {
  InvalidInputException: InvalidInputException
};
