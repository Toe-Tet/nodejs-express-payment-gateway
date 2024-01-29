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

if (config.app.env !== "development") {
	app.use(helmet());
}

// cors
app.use(cors());

// secure cookie
app.use(cookieParser());

// rate limit
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

// set port, listen for requests
const PORT = config.app.port;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
