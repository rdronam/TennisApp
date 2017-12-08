var SQL = require("./sql.js");
var m = require("./match.js");

module.exports = {
	createTournament: function(t) {
		var numberOfPlayers = parseInt(t.NumberOfPlayers);
		switch (numberOfPlayers) {
			case 2:
			var numberOfRounds = 1;
			break;
			case 4:
			var numberOfRounds = 2;
			break;
			case 8:
			var numberOfRounds = 3;
			break;
			case 16:
			var numberOfRounds = 4;
			break;
			case 32:
			var numberOfRounds = 5;
			case 64: 
			var numberOfRounds = 6;
			case 128:
			var numberOfRounds = 7;
		}
		var tournament = {
			TournamentType: t.TournamentType,
			NumberOfPlayers: t.NumberOfPlayers,
			NumberOfRounds: numberOfRounds,
			NumberOfSets: t.NumberOfSets
		}
		SQL.createTournament(tournament);
	}
}