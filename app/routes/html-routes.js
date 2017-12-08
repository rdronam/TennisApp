var Path = require("path");

module.exports = function (App) {
	App.get("/", function (req, res) {
		res.sendFile(Path.join(__dirname, "../public/index.html"));
	});
	App.get("/viewPlayers", function (req, res) {
		console.log("Made it to viewPlayers");
		res.sendFile(Path.join(__dirname, "../public/viewPlayers.html"));
	});
	App.get("/addMatch", function (req, res) {
		console.log("Made it to add Match");
		res.sendFile(Path.join(__dirname, "../public/addMatch.html"));
	});
	App.get("/addTournament", function (req, res) {
		console.log("Made it to add Tournament");
		res.sendFile(Path.join(__dirname, "../public/addTournament.html"));
	});
	App.get("/setup", function (req, res) {
		console.log("Made it to setup");
		res.sendFile(Path.join(__dirname, "../public/setup.html"));
	});
	App.get("/viewTourneyMatches", function (req, res) {
		console.log("Made it to viewTourneyMatches");
		res.sendFile(Path.join(__dirname, "../public/viewTourneyMatches.html"));
	});
}