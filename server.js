const express = require("express");
const config = require("./app/config/config.js");
const app = express();
const path = require("path");
const { default: helmet } = require("helmet");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const {
	globalErrorHandlerMiddleware,
} = require("./app/middleware/global-error-handler.middleware.js");
const AppErrorException = require("./app/exceptions/app-error.exception.js");

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION ! SHUTTING DOWN...");
	console.log(err.name, err.message);
	process.exit(1);
});

if (config.app.env !== "development") {
	app.use(helmet());
}

// cors
app.use(cors());

// parse cookie
// parses the cookie header in the incoming request and converts it into a JavaScript object
app.use(cookieParser());

// rate limit
// 30 requests per 1 second
// prevent DOS
const rateLimiter = new RateLimiterMemory({
	points: 30,
	duration: 1,
});
const rateLimiterMiddleware = (req, res, next) => {
	rateLimiter
		.consume(req.ip)
		.then(() => {
			next();
		})
		.catch(() => {
			res.status(429).send("Too Many Requests");
		});
};
app.use(rateLimiterMiddleware);

// request size limit
app.use(bodyParser.json({ limit: "2mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// logger
app.use(logger("dev"));

// view engine setup
app.set("views", path.join(__dirname, "app", "views"));
app.set("view engine", "hbs");

// register routes
require("./app/routes/routes.js")(app);

app.all("*", (req, res, next) => {
	next(
		new AppErrorException(
			`Can't find ${req.originalUrl} on the server !`,
			404
		)
	);
});

// global error handler
app.use(globalErrorHandlerMiddleware);

// set port, listen for requests
const PORT = config.app.port;
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION ! SHUTTING DOWN...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

module.exports = app;
