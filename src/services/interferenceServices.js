const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");
const fs = require("fs");

async function predictClassification(model, image) {
	try {
		const tensor = tf.node
			.decodeJpeg(image)
			.resizeNearestNeighbor([224, 224])
			.expandDims()
			.toFloat();

		const prediction = model.predict(tensor);
		const score = await prediction.data();
		const confidenceScore = Math.max(...score) * 100;

		let suggestion, label;

		if (confidenceScore > 50) {
			label = "Cancer";
			suggestion = "Segera konsultasi dengan dokter terdekat";
		} else {
			label = "Not Cancer";
			suggestion = "Selamat bukan cancer, jadi anda bisa tidur dengan nyenyak";
		}

		return { label, suggestion, confidenceScore };
	} catch (error) {
		throw new InputError(`Terjadi kesalahan input : ${error.message}`);
	}
}

module.exports = predictClassification;
