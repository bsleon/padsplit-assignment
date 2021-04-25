const Data = require("../models/data.model");

// Defining methods for the dataController
module.exports = {
	findAll: function (req, res) {
		Data.find(req.query)
			// .sort({ date: -1 })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	findById: function (req, res) {
		Data.findById(req.params.id)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	create: function (req, res) {
		Data.create(req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	update: function (req, res) {
		Data.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	remove: function (req, res) {
		Data.findById({ _id: req.params.id })
			.then((dbModel) => dbModel.remove())
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	removeAll: function (req, res) {
		Data.deleteMany({}, function (err) {
			if (err) {
				res.status(500).send({ error: "Could not clean database..." });
			} else {
				res.status(200).send({
					message: "All info was deleted succesfully...",
				});
			}
		});
	},
};
