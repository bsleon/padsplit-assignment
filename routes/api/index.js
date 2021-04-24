const path = require("path");
const router = require("express").Router();
const dataRoutes = require("./data");

router.use("/data", dataRoutes);

// For anything else, render the html page
router.use(function (req, res) {
	res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
