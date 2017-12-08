module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    player_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_games: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    game_points: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    total_wins: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    win_points: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    total_points: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  });
  return Player;
};