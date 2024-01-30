const globalErrorHandlerMiddleware = (err, req, res, next) => {
	// console.log(err, "...global error handler");
	err.statusCode ||= 500;
	res.status(err.statusCode).render("index", { errors: err });
};

module.exports = {
	globalErrorHandlerMiddleware,
};
