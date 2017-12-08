var db = require("../models");
var m = require("../controller/match.js");
var SQL = require("../controller/sql.js");
var t = require("../controller/tournament.js");

module.exports = function(App) {
	App.post("/submit/match", function(req, res) {
  		var match = req.body;
		m.createMatch(match);
	});

	App.post("/submit/tournament", function(req, res) {
  		var tournament = req.body;
		t.createTournament(tournament);
	});

	App.get("/players", function(req, res) {
		var existingPlayers = SQL.getPlayers((existingPlayers)=>{
			res.send(existingPlayers);
		});
	});

	App.get("/players/delete/:id", function(req, res) {
		var id = req.params.id;
		SQL.deletePlayer(id);
	});

	App.get("/matches", function(req, res) {
		var existingMatches = SQL.getMatches((existingMatches)=>{	
			res.send(existingMatches);
		});
	});

	App.get("/matches/edit/:id", function(req, res) {
		var id = req.params.id;
		SQL.editMatch(id);
	});

	App.get("/matches/delete/:id", function(req, res) {
		var id = req.params.id;
		SQL.deleteMatch(id);
	});

	App.get("/tournaments", function(req, res) {
		var existingTournies = SQL.getTournies((existingTournies)=>{	
			res.send(existingTournies);
		});
	});

	App.get("/tournaments/select/:id", function(req, res) {
		var id = req.params.id;
		var existingtourneyMatches = SQL.getTourneyMatches((existingtourneyMatches)=>{	
			res.send(existingtourneyMatches);
		}, id);
	});

	App.get("/tournaments/delete/:id", function(req, res) {
		var id = req.params.id;
		SQL.deleteTourneys(id);
	});


	App.get("/matches/delete/:id", function(req, res) {

	});

	App.get("/gamewinpoints/:playerNumber?", function(req, res) {

	});
}