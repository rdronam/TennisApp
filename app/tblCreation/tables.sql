DROP DATABASE IF EXISTS tennis_db;
CREATE DATABASE tennis_db;
USE tennis_db;
CREATE TABLE tbl_players(
	player_id INT(10) NOT NULL AUTO_INCREMENT,
    player_number INT(2) NOT NULL,
	total_games INT(2) NOT NULL,
    total_wins INT(2) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (player_id)
);

CREATE TABLE tbl_matches(
	match_id INT(10) NOT NULL AUTO_INCREMENT,
    match_type VARCHAR(25) NOT NULL,
    number_of_sets INT(1) NOT NULL,
    player_number INT(2) NOT NULL,
    player_partner_number INT(2),
    opponent_number INT(2) NOT NULL,
    opponent_partner_number INT(2),
    score VARCHAR(25) NOT NULL,
    is_tournament_match BOOL NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (match_id)
);

CREATE TABLE tbl_players_matches(
	players_matches_id INT(10) NOT NULL AUTO_INCREMENT,
    player_id INT(10),
    match_id INT(10),
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (players_matches_id),
    FOREIGN KEY (player_id) REFERENCES tbl_players (player_id),
    FOREIGN KEY (match_id) REFERENCES tbl_matches (match_id)
);
CREATE TABLE tbl_game_win_points(
	game_win_points_id INT(10) NOT NULL AUTO_INCREMENT,
    player_number INT(2) NOT NULL,
    game_points DECIMAL(4,2) NOT NULL,
    win_points DECIMAL(4,2) NOT NULL,
    total_points DECIMAL(4,2) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (game_win_points_id)
);

CREATE TABLE tbl_tournaments(
	tournament_id INT(10) NOT NULL AUTO_INCREMENT,
    tournament_type VARCHAR(10) NOT NULL,
    number_of_rounds INT(2) NOT NULL,
    number_of_sets INT(1) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY(tournament_id)
);

CREATE TABLE tbl_tournaments_players(
	tournaments_players_id INT(10) NOT NULL AUTO_INCREMENT,
    tournament_id INT(10) NOT NULL,
    player_id INT(10) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (tournaments_players_id),
    FOREIGN KEY (tournament_id) REFERENCES tbl_tournaments (tournament_id),
    FOREIGN KEY (player_id) REFERENCES tbl_players (player_id)
);

CREATE TABLE tbl_tournaments_matches(
	tournaments_matches_id INT(10) NOT NULL AUTO_INCREMENT,
    tournament_id INT(2) NOT NULL,
    match_id INT(2) NOT NULL,
    round_number INT(3) NOT NULL,
    match_number INT(3) NOT NULL,
    number_of_sets INT(1) NOT NULL,
    player_number INT(2) NOT NULL,
    opponent_number INT(2) NOT NULL,
    score VARCHAR(25) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (tournaments_matches_id),
	FOREIGN KEY (tournament_id) REFERENCES tbl_tournaments (tournament_id),
	FOREIGN KEY (match_id) REFERENCES tbl_matches (match_id)
);

USE tennis_db;
SELECT * FROM tbl_players;
USE tennis_db;
SELECT * FROM tbl_matches;
USE tennis_db;
SELECT * FROM tbl_players_matches;
USE tennis_db;
SELECT * FROM tbl_game_win_points;
USE tennis_db;
SELECT * FROM tbl_tournaments;
USE tennis_db;
SELECT * FROM tbl_tournaments_players;
USE tennis_db;
SELECT * FROM tbl_tournaments_matches;