module.exports = function(sequelize, DataTypes) {
  var Tournament = sequelize.define("Tournament", {
    tournament_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number_of_players: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_of_rounds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_of_sets: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Tournament;
}