const { Firestore } = require("@google-cloud/firestore");

async function storeData(id, data) {
	const db = new Firestore();

	const predictCollection = db.collection("prediction");
	return predictCollection.doc(id).set(data);
}

async function getData() {
	const db = new Firestore();

	const querySnapshot = await db.collection("prediction").get();
	const data = querySnapshot.docs.map((doc) => {
		return { id: doc.id, history: doc.data() };
	});

	return data;
}

module.exports = { storeData, getData };
