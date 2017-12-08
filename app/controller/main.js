var Match = require("./match.js");
var Tournament = require("./tournament.js");
var command = process.argv[2];
var command2 = process.argv[3];
var command3 = process.argv[4];
var command4 = process.argv[5];
	
commandSwitch(command);

function commandSwitch(command) {
	switch(command) {
		case "record":
		var isTournamentMatch = false;
		Match.createMatch(command2, command3, isTournamentMatch);
		break;
		case "tournament":
		var isTournamentMatch = true;
		Tournament.createTournament(command2, command3, command4, isTournamentMatch);
		break;
	}
}