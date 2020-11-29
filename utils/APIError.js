
/**
 * @description EXTENDS ERROR 
 */
class ExtendableError extends Error {
    constructor({ message, errors, status, isPublic, stack }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        this.stack = stack
    }
}


/**
 * @description EXTENDS CLASS ExtendableError
 */
class APIError extends ExtendableError {
    constructor({ message, errors, status, isPublic, stack }) {
        super({ message, errors, status, isPublic, stack })
    }
}

module.exports = APIError