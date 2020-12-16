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
    constructor(msg) {
        super(msg || "invalid input", 400);
    }
}

class UnauthorizedException extends ApplicationException {
    constructor() {
        super("unauthorized", 403);
    }
}

class AccountNotActivatedException extends ApplicationException{
    constructor() {
        super("account not activated", 405);
    }
}

module.exports = {
    InvalidInputException: InvalidInputException,
    UnauthorizedException: UnauthorizedException,
    AccountNotActivatedException: AccountNotActivatedException
};
