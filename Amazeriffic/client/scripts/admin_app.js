var liaWithEditOrDeleteOnClick = function (user, callback) {
	var $userListItem = $("<li>").text(user.username),
		$userEditLink = $("<a>").attr("href", "users/" + user._id),
		$userRemoveLink = $("<a>").attr("href", "users/" + user._id);

	$userEditLink.addClass("linkEdit");
	$userRemoveLink.addClass("linkRemove");

	$userRemoveLink.text("Удалить");
	$userRemoveLink.on("click", function () {
		$.ajax({
			url: "/users/" + username,
			type: "DELETE"
		}).done(function (responde) {
			callback();
		}).fail(function (err) {
			console.log("error on delete 'user'!");
		});
		return false;
	});
	$userListItem.append($userRemoveLink);

	$userEditLink.text("Редактировать");
	$userEditLink.on("click", function() {
		var newUsername = prompt("Введите новое наименование для задачи", user.username);
		if (newUsername !== null && newUsername.trim() !== "") {
			$.ajax({
				"url": "/users/" + username,
				"type": "PUT",
				"data": { "username": newUsername },
			}).done(function (responde) {
				callback();
			}).fail(function (err) {
				console.log("Произошла ошибка: " + err);
			});
		}
		return false;
	});
	$userListItem.append($userEditLink);
	return $userListItem;
}

var main = function (UsersObjects) {
	"use strict";
	// создание пустого массива с вкладками
	var tabs = [];
	// добавляем вкладку Новые
	tabs.push({
		"name": "Список пользователей",
		// создаем функцию content
		// так, что она принимает обратный вызов
		"content": function(callback) {
			$.getJSON("users.json", function (UsersObjects) {
				var $content = $("<ul>");
				for (var i = UsersObjects.length-1; i>=0; i--) {
					var $userListItem = liaWithEditOrDeleteOnClick(UsersObjects[i], function() {
						$(".tabs a:first-child span").trigger("click");
					});
					$content.append($userListItem);
				}
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main .tabs").append($aElement);

		$spanElement.on("click", function () {
			var $content;
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();
			tab.content(function (err, $content) {
				if (err !== null) {
					alert ("Возникла проблема при обработке запроса: " + err);
				} else {
					$("main .content").append($content);
				}
			});
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
}

$(document).ready(function() {
	$.getJSON("users.json", function (UsersObjects) {
		main(UsersObjects);
	});
});