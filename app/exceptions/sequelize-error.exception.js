class SequelizeErrorException extends Error {
	constructor(message = "Sequelize Error Exception", errors = []) {
		super(message);
		this.name = "SequelizeErrorException";
		this.statusCode = 500;
		this.errors = errors.errors;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = SequelizeErrorException;
