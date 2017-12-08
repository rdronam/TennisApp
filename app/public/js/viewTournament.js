$(document).ready(function () {
	$(document).on("click", ".delete", function () {
		var thisId = $(this).attr("data-id");
		$.ajax({
			type: "GET",
			url: "/players/delete/" + thisId
		});
		$(this).parents("tr").remove();
		getTournaments();
	});

	function getTournaments() {
		$("#tournies").empty();
		$.getJSON("/tournament", function (data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				$("#tournies").prepend("<tr><td>" + data[i].section + "</td><td>" +
					data[i].id + "</td><td>" +
					data[i].section + "</td><td>" +
					data[i].match_type + "</td><td>" +
					data[i].number_of_sets + "</td><td>" +
					data[i].player_number + "</td><td>" +
					data[i].total_points +  "</td><td>" +
					"</td><td><button class='delete' data-id='" + data[i].id + "'>Delete</button></td></tr>");
			}
			$("#tournies").prepend("<tr><th>Section Number </th><th>Number </th><th>Games  </th><th>Game Points</th><th>Wins</th><th>Win Points  </th><th>Total Points</th></tr>");
		});
	}
	getTournaments();
});