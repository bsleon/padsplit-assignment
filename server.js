const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dataRouter = require("./routes/dataRoutes");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

// Create a new express application named 'app'
const app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
	console.log(`Request_Endpoint: ${req.method} ${req.url}`);
	next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//Configure the cors middleware
app.use(cors());


// Add route
app.use("/rooms", dataRouter);

// This middleware informs the express application to serve our compiled React files
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
	app.use(express.static(path.join(__dirname, "client/build")));

	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

// Catch any bad requests
app.get("*", (req, res) => {
	res.status(200).json({
		msg: "Catch All",
	});
});

//connect to the mongo db
mongoose
	// .connect("mongodb://localhost:27017/PadsplitAssignment" || process.env.REACT_APP_MONGODB_URI, {
		.connect(process.env.REACT_APP_MONGODB_URI, {
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
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
