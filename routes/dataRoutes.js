const router = require("express").Router();
const dataController = require("../controllers/dataController");

router
	.route("/")
	.get(dataController.findAll)
	.post(dataController.create)
	.delete(dataController.removeAll);
router
	.route("/:id")
	.get(dataController.findById)
	.put(dataController.update)
	.delete(dataController.remove);

module.exports = router;
