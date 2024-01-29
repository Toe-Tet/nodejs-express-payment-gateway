const { Router } = require("express");
const { index, order } = require("../controllers/order.controller");
const { orderDto } = require("../dto/order.dto");

const routes = (app) => {
	const router = Router();

	router.route("/").get(index).post(orderDto, order);

	app.use("/", router);
};

module.exports = routes;
