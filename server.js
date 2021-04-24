const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

//connect to the mongo db
mongoose.connect("mongodb://localhost:27017/PadsplitAssignment");

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
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
