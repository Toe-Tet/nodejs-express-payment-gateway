class ValidationErrorException extends Error {
	constructor(message = "Validation Error", errors = []) {
		super(message);
		this.name = "ValidationErrorException";
		this.statusCode = 400;
		this.errors = errors;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ValidationErrorException;
