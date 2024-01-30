const extractObject = (obj, keys) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([key]) => keys.includes(key))
	);
};

const isObjectNotEmpty = (obj) => {
	return Object.keys(obj).length > 0;
};

const convertCamelCaseToSpaces = (inputString) => {
	return inputString
		.replace(/([A-Z])/g, " $1")
		.trim()
		.toLowerCase();
};

const catchAsync = (handler) => {
	console.log("....catch async");
	return (req, res, next) => {
		console.log("....catch async run");
		handler(req, res, next).catch((err) => {
			console.log(err, "....catch async error");
			next(err);
		});
	};
};

module.exports = {
	extractObject,
	isObjectNotEmpty,
	convertCamelCaseToSpaces,
	catchAsync,
};
