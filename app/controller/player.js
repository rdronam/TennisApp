var SQL = require("./sql.js");
var gamePoints;
var winPoints;
var totalPoints;

module.exports = {
	checkPlayer: function(section, number, score, winLose) {
		self = this;
		var player = {
            Section: section,
			Number: number,
			Game: score,
			GamePoints: null,
			Win: winLose,
			WinPoints: null,
			TotalPoints: null
		}
		self.getGameWinPoints(player);
	},
	getGameWinPoints: function(player) {
		gamePoints = this.getGamePoints(player.Game);
		winPoints = this.getWinPoints(player.Win);
		totalPoints = parseFloat(gamePoints) + parseFloat(winPoints);
		player.GamePoints = gamePoints;
		player.WinPoints = winPoints;
		player.TotalPoints = totalPoints;
		SQL.checkPlayer(player);
	},
	getGamePoints: function(game) {
		if (game >= 47) {
			gamePoints = 15;
			return gamePoints;
		}
		else if (40 <= game && game <= 46) {
			gamePoints = 14;
			return gamePoints;
		}
		else if (30 <= game && game <= 39)
        {
            gamePoints = 13;
            return gamePoints;
        }
        else if (25 <= game && game <= 29)
        {
            gamePoints = 12;
            return gamePoints;
        }
        else if (20 <= game && game <= 24)
        {
            gamePoints = 11;
            return gamePoints;
        }
        else if (0 <= game && game <= 19)
        {
            gamePoints = 10;
            return gamePoints;
        }
        else {
        	return gamePoints;
        }
	},
	getWinPoints: function(win) {
		if (win >= 9)
        {
            winPoints = 15;
            return winPoints;
        }
        else if (win == 8)
        {
            winPoints = 14.5;
            return winPoints;
        }
        else if (win == 7)
        {
            winPoints = 14;
            return winPoints;
        }
        else if (win == 6)
        {
            winPoints = 13.5;
            return winPoints;
        }
        else if (win == 5)
        {
            winPoints = 13;
            return winPoints;
        }
        else if (win == 4)
        {
            winPoints = 12.5;
            return winPoints;
        }
        else if (win == 3)
        {
            winPoints = 12;
            return winPoints;
        }
        else if (win == 2)
        {
            winPoints = 11.5;
            return winPoints;
        }
        else if (win == 1)
        {
            winPoints = 11;
            return winPoints;
        }
        else if (win == 0)
        {
            winPoints = 10.5;
            return winPoints;
        }
        else
        {
           return winPoints;
        }
	}
}