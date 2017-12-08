var db = require("../models");

module.exports = function(App) {
	App.get("/players/:playerNumber?", function(req, res) {
		var playerNumber = req.params.playerNumber;
		if (playerNumber) {

		}
		else {
			// db.Player.findAll({}).then(function(dbPlayer) {
			// 	res.json(dbPlayer);
			// });
		}
	});

	App.get("/matches", function(req, res) {

	});

	App.get("/gamewinpoints/:playerNumber?", function(req, res) {
		var playerNumber = req.params.playerNumber;
		if (playerNumber) {

		}
		else {

		}
	});
}