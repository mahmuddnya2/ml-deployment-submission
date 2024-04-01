const handler = require("../server/handler");

const routes = [
	{
		path: "/predict",
		method: "POST",
		handler: handler.postPredictHandler,
		options: {
			payload: {
				allow: "multipart/form-data",
				multipart: true,
				maxBytes: 1024 * 1024,
			},
		},
	},
	{
		path: "/predict/histories",
		method: "GET",
		handler: handler.getHistoryHandler,
	},
	{
		path: "/",
		method: "GET",
		handler: handler.helloWorld,
	},
];

module.exports = routes;
