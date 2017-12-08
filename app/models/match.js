module.exports = function(sequelize, DataTypes) {
  var Match = sequelize.define("Match", {
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    match_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number_of_sets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    player_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    player_partner_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    opponent_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    opponent_partner_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    score: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_tournament_match: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    tournament_section: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Match;
}