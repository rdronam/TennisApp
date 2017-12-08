var Player = require("./player.js");
var SQL = require("./sql.js");
var splitter = "-";
var splitter2= ",";
var splitNumbers;
var section;
var numberOfSets;
var playerNumber;
var playerPartnerNumber;
var playerScore = 0;
var playerWinLose;
var opponentNumber;
var opponentPartnerNumber;
var opponentScore = 0;
var opponentWinLose;
var winLose = [];
var winnerLoser = [];
var splitMatchScore = [];
var splitSetScore = [];
var scores = [];

module.exports = {
	createMatch: function(match) {
		score = match.Score;
		if (match.IsTournamentMatch === "false") {
			isTournamentMatch = false;
		}
		else {
			isTournamentMatch = true;
		}
		if (isTournamentMatch === false) {
			playerNumber = match.PlayerNumber;
			opponentNumber = match.OpponentNumber;
			if (score.length === 3) {
				splitSetScore = score.split(splitter);
				playerScore = splitSetScore[0];
				opponentScore = splitSetScore[1];
				numberOfSets = 1;
			}
			else {
				splitMatchScore = score.split(splitter2);
				for (i = 0; i < splitMatchScore.length; i++) {
					splitSetScore[i] = splitMatchScore[i].split(splitter);
				}
				numberOfSets = splitMatchScore.length;
				for (i = 0; i < splitSetScore.length; i++) {
					playerScore += parseInt(splitSetScore[i][0]);
					opponentScore += parseInt(splitSetScore[i][1]);
				}
			}
			var match = {
				Section: match.Section,
				MatchType: "SINGLES",
				NumberOfSets: numberOfSets,
				PlayerNumber: playerNumber,
				PlayerPartnerNumber: playerPartnerNumber,
				OpponentNumber: opponentNumber,
				OpponentPartnerNumber: opponentPartnerNumber,
				Score: score,
				IsTournamentMatch: isTournamentMatch,
				TournamentSection: null
			}
			scores[0] = playerScore;
			playerScore = parseInt(playerScore);
			scores[1] = opponentScore;
			opponentScore = parseInt(opponentScore);
			winnerLoser = this.checkWinLose(playerScore, opponentScore);
			Player.checkPlayer(match.Section, playerNumber, playerScore, winnerLoser[0]);
			Player.checkPlayer(match.Section, opponentNumber, opponentScore, winnerLoser[1]);
			SQL.createMatch(match);
			playerScore = 0;
			opponentScore = 0;
		}
	},
	checkWinLose: function(playerScore, opponentScore) {
		if (playerScore > opponentScore) {
			playerWinLose = 1;
			opponentWinLose = 0;
		}
		else {
			playerWinLose = 0;
			opponentWinLose = 1;
		}
		winLose[0] = playerWinLose;
		winLose[1] = opponentWinLose;
		return winLose;
	}
}