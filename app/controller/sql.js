var db = require("../models");
var matches = [];
var playerCount = 1;

module.exports = {
	createMatch: function (match) {
		db.Match.create({
			section: match.Section,
			match_type: match.MatchType,
			number_of_sets: match.NumberOfSets,
			player_number: match.PlayerNumber,
			player_partner_number: match.PlayerPartnerNumber,
			opponent_number: match.OpponentNumber,
			opponent_partner_number: match.OpponentPartnerNumber,
			score: match.Score,
			is_tournament_match: match.IsTournamentMatch,
			tournament_section: match.TournamentSection,
			createdAt: null,
			updatedAt: null
		});
	},
	getMatches: function (cb) {
		console.log("SQL for getting matches goes here");
		var existingMatches = [];
		db.Match.findAll({})
			.then(function (dbMatch) {
				for (i = 0; i < dbMatch.length; i++) {
					existingMatches.unshift(dbMatch[i].dataValues);
				}
				if (cb) {
					cb(existingMatches);
				}
			});
	},
	editMatch: function (id) {
		console.log("SQL for editing a match goes here");
	},
	deleteMatch: function (id) {
		self = this;
		console.log("SQL for deleting a match goes here");
		db.Match.findOne({
			where: {
				id: id
			}
		}).then(function (dbMatch) {
			var score = [];
			score = dbMatch.dataValues.score;
			var splitter = "-";
			var splitSetScore = score.split(splitter);
			var playerScore = splitSetScore[0];
			var opponentScore = splitSetScore[1];
			var m = require("./match.js");
			var winLose = [];
			winLose = m.checkWinLose(playerScore, opponentScore);
			var player = {
            	Section: dbMatch.dataValues.section,
				Number: dbMatch.dataValues.player_number,
				Game: playerScore,
				GamePoints: null,
				Win: winLose[0],
				WinPoints: null,
				TotalPoints: null
			}
			var opponent = {
            	Section: dbMatch.dataValues.section,
				Number: dbMatch.dataValues.opponent_number,
				Game: opponentScore,
				GamePoints: null,
				Win: winLose[1],
				WinPoints: null,
				TotalPoints: null
			}
			self.editPlayer(player);
			self.editPlayer(opponent);
			db.Match.destroy({
				where: {
					id: id
				}
			}).then(function (dbMatch2) {

			});
		})
	},
	getTournies: function (cb) {
		console.log("SQL for getting tournies goes here");
		var existingTournies = [];
		db.Tournament.findAll({})
			.then(function (dbTourney) {
				for (i = 0; i < dbTourney.length; i++) {
					existingTournies.push(dbTourney[i].dataValues);
				}
				if (cb) {
					cb(existingTournies);
				}
			});
	},

	deleteTourneys: function (id) {
		console.log("SQL for deleting a match goes here");
		db.Tournament.destroy({
			where: {
				id: id
			}
		}).then(function (dbTourney) {

		});
	},
	getTourneyMatches: function (cb, id) {
		console.log("SQL for getting tourney matches goes here");
		var existingTourneyMatches = [];
		db.Match.findAll({
			where: {
				tournament_section: { like: id + '%' }
			}
		})
			.then(function (dbTourneyMatch) {
				for (i = 0; i < dbTourneyMatch.length; i++) {
					existingTourneyMatches.push(dbTourneyMatch[i].dataValues);
				}
				if (cb) {
					cb(existingTourneyMatches);
				}
			});
	},
	checkPlayer: function (player) {
		db.Player.findOne({
			where: {
				section: player.Section,
				player_number: player.Number
			}
		}).then(function (dbPlayer) {
			if (dbPlayer == null) {
				db.Player.create({
					section: player.Section,
					player_number: player.Number,
					total_games: player.Game,
					game_points: player.GamePoints,
					total_wins: player.Win,
					win_points: player.WinPoints,
					total_points: player.TotalPoints,
					createdAt: null,
					updatedAt: null
				}).then(function (dbPlayer2) {

				});
			}
			else {
				var p = require("./player");
				existingPlayer = dbPlayer.dataValues;
				var newTotalGames = existingPlayer.total_games + player.Game;
				var newTotalGamePoints = p.getGamePoints(newTotalGames);
				var newTotalWins = existingPlayer.total_wins + player.Win;
				var newTotalWinPoints = p.getWinPoints(newTotalWins);
				var newTotalPoints = parseFloat(newTotalGamePoints) + parseFloat(newTotalWinPoints);
				db.Player.update({
					total_games: newTotalGames,
					game_points: newTotalGamePoints,
					total_wins: newTotalWins,
					win_points: newTotalWinPoints,
					total_points: newTotalPoints
				}, {
					where: { 
						section: existingPlayer.section,
						player_number: existingPlayer.player_number 
					}
				}).then(function (dbPlayer3) {

				});
			}
		});
	},
	getPlayers: function (cb) {
		console.log("SQL for getting players goes here");
		var existingPlayers = [];
		db.Player.findAll({})
			.then(function (dbPlayer) {
				for (i = 0; i < dbPlayer.length; i++) {
					existingPlayers.unshift(dbPlayer[i].dataValues);
				}
				if (cb) {
					cb(existingPlayers);
				}
			});
	},
	editPlayer: function (player) {
		console.log("SQL for editing a player goes here");
		db.Player.findOne({
			where: {
				section: player.Section,
				player_number: player.Number
			}
		}).then(function (dbPlayer) {
			var p = require("./player");
			existingPlayer = dbPlayer.dataValues;
			var newTotalGames = existingPlayer.total_games - player.Game;
			var newTotalGamePoints = p.getGamePoints(newTotalGames);
			var newTotalWins = existingPlayer.total_wins - player.Win;
			var newTotalWinPoints = p.getWinPoints(newTotalWins);
			var newTotalPoints = parseFloat(newTotalGamePoints) + parseFloat(newTotalWinPoints);
			db.Player.update({
				total_games: newTotalGames,
				game_points: newTotalGamePoints,
				total_wins: newTotalWins,
				win_points: newTotalWinPoints,
				total_points: newTotalPoints
			}, {
				where: { 
					section: existingPlayer.section,
					player_number: existingPlayer.player_number 
				}
			}).then(function (dbPlayer2) {

			});
		});
	},
	deletePlayer: function (id) {
		console.log("SQL for deleting a player goes here");
		db.Player.destroy({
			where: {
				id: id
			}
		}).then(function (dbPlayer) {

		});
	},
	createTournament: function (tournament) {
		self = this;
		db.Tournament.create({
			tournament_type: tournament.TournamentType,
			number_of_players: tournament.NumberOfPlayers,
			number_of_rounds: tournament.NumberOfRounds,
			number_of_sets: tournament.NumberOfSets,
			tournament_section: null
		}).then(function (dbTournament) {
			self.createTournamentMatch(dbTournament.dataValues);
		});
	},
	createTournamentMatch: function (tournament) {
		self = this;
		var count = 0;
		var roundCount = 1;
		var matchCount = 1;
		var playerCount = tournament.number_of_players;
		var score = "0-0";
		db.Tournament.findOne({
			where: {
				id: tournament.id
			}
		}).then(function (dbTournament) {
			while (roundCount <= dbTournament.dataValues.number_of_rounds) {
				switch (roundCount) {
					case 1:
						var firstRoundMatchCount = playerCount / 2;
						self.generateTournamentFillerData(dbTournament.dataValues, firstRoundMatchCount, roundCount);
						break;
					case 2:
						var secondRoundMatchCount = firstRoundMatchCount / 2;
						self.generateTournamentFillerData(dbTournament.dataValues, secondRoundMatchCount, roundCount);
						break;
					case 3:
						var thirdRoundMatchCount = secondRoundMatchCount / 2;
						self.generateTournamentFillerData(dbTournament.dataValues, thirdRoundMatchCount, roundCount);
						break;
					case 4:
						var fourthRoundMatchCount = thirdRoundMatchCount / 2;
						self.generateTournamentFillerData(dbTournament.dataValues, fourthRoundMatchCount, roundCount);
						break;
					case 5:
						var fifthRoundMatchCount = fourthRoundMatchCount / 2;
						self.generateTournamentFillerData(dbTournament.dataValues, fifthRoundMatchCount, roundCount);
						break;
					case 6:
						var sixthRoundMatchCount = fifthRoundMatchCount / 2;
						self.generateTournamentFillerData(dbTournament.dataValues, sixthRoundMatchCount, roundCount);
						break;
					case 7:
						var seventhRoundMatchCount = sixthRoundMatchCount / 2;
						self.generateTournamentFillerData(dbTournament.dataValues, seventhRoundMatchCount, roundCount);
						break;
				}
				roundCount++;
			}
			self.pushTournamentFillerData(matches);
			matches = [];
		});
	},
	generateTournamentFillerData: function (tournament, roundMatchCount, roundCount) {
		var matchCount = 1;
		var count = 0;
		var score = "0-0";
		var fillerPlayerNumber;
		var fillerOpponentNumber;
		var fillerPlayerPartnerNumber;
		var fillerOpponentPartnerNumber;
		while (matchCount <= roundMatchCount) {
			if (tournament.tournament_type === "singles") {
				fillerPlayerNumber = "P" + playerCount;
				fillerOpponentNumber = "O" + playerCount;
			}
			else {
				fillerPlayerNumber = "P" + playerCount;
				fillerPlayerPartnerNumber = "PP" + playerCount;
				fillerOpponentNumber = "O" + playerCount;
				fillerOpponentPartnerNumber = "OP" + playerCount;
			}
			var tournamentSection = tournament.id + "-" + roundCount + "-" + matchCount;
			while (count <= (tournament.number_of_sets)) {
				if (count < (tournament.number_of_sets - 1)) {
					score += ",0-0";
				}
				count++;
			}
			match = {
				Section: "T",
				MatchType: tournament.tournament_type,
				NumberOfSets: tournament.number_of_sets,
				PlayerNumber: fillerPlayerNumber,
				PlayerPartnerNumber: fillerPlayerPartnerNumber,
				OpponentNumber: fillerOpponentNumber,
				OpponentPartnerNumber: fillerOpponentPartnerNumber,
				Score: score,
				IsTournamentMatch: true,
				TournamentSection: tournamentSection
			}
			playerCount++;
			matchCount++;
			matches.push(match);
		}
	},
	pushTournamentFillerData: function (matches) {
		for (i = 0; i < matches.length; i++) {
			self.createMatch(matches[i]);
		}
		playerCount = 1;
	}
}