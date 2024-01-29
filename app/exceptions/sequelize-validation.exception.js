class SequelizeValidationException extends Error {
	constructor(message = "Sequelize Validation Error", errors) {
		super(message);
		this.name = "SequelizeValidationException";
		this.statusCode = 500;
		this.errors = errors.errors;
	}
}

module.exports = SequelizeValidationException;
