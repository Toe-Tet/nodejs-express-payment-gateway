class InternalServerErrorException extends Error {
	constructor(message = "Internal Server Error Exception", errors = []) {
		super(message);
		this.name = "InternalServerErrorException";
		this.statusCode = 400;
		this.errors = [
			{
				message: message,
			},
		];
	}
}

module.exports = InternalServerErrorException;
