$(document).ready(function () {
	$("#addMatch").on("click", function () {
		$.ajax({
			type: "POST",
			url: "/submit/match",
			dataType: "json",
			data: {
				Section: $("#section").val(),
				PlayerNumber: $("#playerNumber").val(),
				PlayerPartnerNumber: $("#playerPartnerNumber").val(),
				OpponentNumber: $("#opponentNumber").val(),
				OpponentPartnerNumber: $("#opponentPartnerNumber").val(),
				Score: $("#score").val(),
				IsTournamentMatch: false
			}
		}).done(function(data) {
			getMatches();
			$("#section").val("");
			$("#playerNumber").val("");
			$("#playerPartnerNumber").val("");
			$("#opponentNumber").val("");
			$("#opponentParterNumber").val("");
			$("#score").val("");
		}
		);
		window.location.reload(true);
		return false;
	});

	$(document).on("click", ".delete", function () {
		var thisId = $(this).attr("data-id");
		$.ajax({
			type: "GET",
			url: "/matches/delete/" + thisId
		});
		$(this).parents("tr").remove();
		window.location.reload(true);
		getMatches();
	});

	$(document).on("click", ".edit", function () {
		var thisId = $(this).attr("data-id");
		$.ajax({
			type: "GET",
			url: "/matches/edit/" + thisId
		});
		$(this).parents("tr").remove();
		window.location.reload(true);
		getMatches();
	});

	function getMatches() {
		$("#matches").empty();
		$.getJSON("/matches", function (data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				if (data[i].section === "T") {
					break;
				} else {
					$("#matches").prepend("<tr><td>" + data[i].section + "</td><td>" +
						data[i].match_type + "</td><td>" +
						data[i].number_of_sets + "</td><td>" +
						data[i].player_number + "</td><td>" +
						data[i].opponent_number + "</td><td>" +
						data[i].score +
						// "</td><td><button class='edit' data-id='" + data[i].id + "'>Edit</button></td>" +
						"</td><td><button class='delete' data-id='" + data[i].id + "'>Delete</button></td></tr>");
				}
			}
			$("#matches").prepend("<tr><th>Section Number </th><th>Match Type </th><th>Number of Sets  </th><th>Player </th><th>Opponent </th><th>Score</th></tr>");
		});
	}
	getMatches();
});
