const express = require("express");
const mongoose = require("mongoose");
const dataRouter = require("./routes/dataRoutes");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add route
app.use("/rooms", dataRouter);

//connect to the mongo db
mongoose
	.connect("mongodb://localhost:27017/PadsplitAssignment" || process.env.REACT_APP_MONGODB_URI, {
	// .connect(process.env.REACT_APP_MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log("Database Connected Successfully"))
	.catch((err) => console.log(err));

//connection log
const connection = mongoose.connection;
connection.on("error", (e) => {
	console.log("Mongo DB database connection failed.", e);
	// console.error("Mongo DB database connection failed."+ e);
});

connection.once("open", () => {
	console.log("Mongo DB connection established successfully.");
	// console.log("Mongo DB connection established successfully.");
});

// Start the API server
app.listen(PORT, () => console.log(`BACK_END_SERVICE_PORT: ${PORT}`));
