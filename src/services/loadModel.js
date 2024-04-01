const tf = require("@tensorflow/tfjs-node");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../../.env` });

async function loadModel() {
	return tf.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;
