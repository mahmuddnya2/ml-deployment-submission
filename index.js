const Hapi = require("@hapi/hapi");
const routes = require("./src/server/routes");
const loadModel = require("./src/services/loadModel");
const InputError = require("./src/exceptions/InputError");

(async () => {
	const server = Hapi.server({
		port: 3000,
		host: "0.0.0.0",
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	});

	const model = await loadModel();
	server.app.model = model;

	server.route(routes);

	server.ext("onPreResponse", function (request, h) {
		const response = request.response;

		if (!response.statusCode) {
			if (response.output.statusCode == 413) {
				const newResponse = h.response({
					status: "fail",
					message: response.output.payload.message,
				});
				newResponse.code(response.output.statusCode);
				return newResponse;
			}
		}

		if (response instanceof InputError) {
			const newResponse = h.response({
				status: "fail",
				message: `Terjadi kesalahan ketika melakukan prediksi`,
			});
			newResponse.code(response.statusCode);
			return newResponse;
		}

		if (response.isBoom) {
			const newResponse = h.response({
				status: "fail",
				message: response.message,
			});
			newResponse.code(response.statusCode);
			return newResponse;
		}

		return h.continue;
	});

	await server.start();
	console.log(`server run at ${server.info.uri}`);
})();
