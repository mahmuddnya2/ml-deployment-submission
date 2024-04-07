const predictClassification = require("../services/interferenceServices");
const crypto = require("crypto");
const dataAct = require("../services/storeData");

async function postPredictHandler(request, h) {
	const { image } = request.payload;
	const { model } = request.server.app;

	const { label, suggestion, confidenceScore } = await predictClassification(
		model,
		image
	);
	const id = crypto.randomUUID();
	const createdAt = new Date().toISOString();

	const data = {
		id: id,
		result: label,
		suggestion: suggestion,
		createdAt: createdAt,
	};

	await dataAct.storeData(id, data);

	const response = h.response({
		status: "success",
		message:
			confidenceScore > 50
				? "Model is predicted successfully"
				: "Model is predicted successfully but under threshold. Please use the correct picture",
		data,
	});
	response.code(201);
	return response;
}

async function getHistoryHandler(request, h) {
	const response = h.response({
		status: "success",
		data: await dataAct.getData(),
	});
	response.code(200);
	return response;
}

async function helloWorld(request, h) {
	return "hello world";
}

module.exports = { postPredictHandler, getHistoryHandler, helloWorld };
