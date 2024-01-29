class ValidationException extends Error {
	constructor(message = "Validation Error", errors = []) {
		super(message);
		this.name = "ValidationException";
		this.statusCode = 400;
		this.errors = errors;
	}
}

module.exports = ValidationException;
