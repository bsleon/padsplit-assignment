const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
	// title: { type: String, required: true },
	// subtitle: { type: String },
	// authors: { type: [String], required: true },
	// link: { type: String, required: true },
	// description: { type: String, required: true },
	// image: { type: String, required: true },
	// googleId: { type: String, required: true, unique: true },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
