const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
	move_out_date: { type: String, required: false },
	id: { type: String, required: false },
	picture: { type: String, required: false },
	address: { type: String, required: false },
	room: { type: String, required: false },
	location: { type: String, required: false },
	last_occupant: { type: String, required: false },
	uid: { type: String, required: false },
	balance: { type: String, required: false },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
