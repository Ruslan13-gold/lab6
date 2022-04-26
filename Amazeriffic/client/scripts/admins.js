var liaWithEditOrDeleteOnClick = function (user, callback) {
	var $userListItem = $("<li>").text(user.username); return $userListItem; }

var main = function (UsersObjects) { "use strict";
	var $input = $("<input>").addClass("username"),	
		$butDestroy = $("<button>").text("Удалить пользователя");

	$butDestroy.on("click", function() {
		if ($input.val() !== "") {
			if ($input.val() !== null && $input.val().trim() !== "") {
				var username = $input.val();
				if (confirm("Вы уверены, что хотете удалить пользователя " + username + "?")) {
					$.ajax({ 'url': '/users/'+username, 'type': 'DELETE',
					}).done(function(responde) { console.log(responde); $input.val("");
						alert('Пользователь успешно удален');
					}).fail(function(jqXHR, textStatus, error) { console.log(error);
						alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
					});
				}
			}
		}
	});
	$("main .authorization").append($input); $("main .authorization").append($butDestroy);
	var tabs = [];
	tabs.push({ "name": "Список пользователей",
		"content": function(callback) {
			$.getJSON("users.json", function (UsersObjects) {
				var $content = $("<ul>");
				for (var i = UsersObjects.length-1; i>=0; i--) {
					var $userListItem = liaWithEditOrDeleteOnClick(UsersObjects[i], function() {
						$(".tabs a:first-child span").trigger("click"); });
					$content.append($userListItem); }
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) { callback(error, null); });
		}
	});

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""), $spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main .tabs").append($aElement);
		$spanElement.on("click", function () { var $content;
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();
			tab.content(function (err, $content) {
				if (err !== null) {
					alert ("Возникла проблема при обработке запроса: " + err);
				} else { $("main .content").append($content); }
			});
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
}

$(document).ready(function() {
	$.getJSON("users.json", function (UsersObjects) { main(UsersObjects); });
});