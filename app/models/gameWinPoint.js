module.exports = function(sequelize, DataTypes) {
	var GameWinPoints = sequelize.define("Game_Win_Points", {
		section: {
			type: DataTypes.STRING,
			allowNull: false
		},
		player_number: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		game_points: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		win_points: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		total_points: {
			type: DataTypes.DECIMAL,
			allowNull: false
		}
	});
	return GameWinPoints;
}