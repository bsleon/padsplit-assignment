const router = require("express").Router();
const dataController = require("../../controllers/dataController");

// Matches with "/api/books"
router.route("/").get(dataController.findAll).post(dataController.create);

// Matches with "/api/books/:id"
router
	.route("/:id")
	.get(dataController.findById)
	.put(dataController.update)
	.delete(dataController.remove);

module.exports = router;
