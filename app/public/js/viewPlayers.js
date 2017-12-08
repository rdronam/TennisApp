$(document).ready(function() {
	$(document).on("click", ".delete", function () {
		var thisId = $(this).attr("data-id");
		$.ajax({
			type: "GET",
			url: "/players/delete/" + thisId
		});
		$(this).parents("tr").remove();
		window.location.reload(true);
		getPlayers();
	});

	function getPlayers() {
		$("#players").empty();
		$.getJSON("/players", function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				$("#players").prepend("<tr><td>" + data[i].section + "</td><td>" +
					data[i].player_number + "</td><td>" +
					data[i].total_games + "</td><td>" +
					data[i].game_points + "</td><td>" +
					data[i].total_wins + "</td><td>" +
					data[i].win_points + "</td><td>" +
					data[i].total_points +
					"</td><td><button class='delete' data-id='" + data[i].id + "'>Delete</button></td></tr>");
			}
			$("#players").prepend("<tr><th>Section Number </th><th>Number </th><th>Games  </th><th>Game Points</th><th>Wins</th><th>Win Points  </th><th>Total Points</th></tr>");
		});
	}
	getPlayers();
});