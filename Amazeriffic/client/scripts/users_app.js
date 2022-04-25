var liaWithEditOrDeleteOnClick = function (todo, callback) {
	var $todoListItem = $("<li>").text(todo.description),
		$todoEditLink = $("<a>").attr("href", "todos/" + todo._id),
		$todoRemoveLink = $("<a>").attr("href", "todos/" + todo._id);

	$todoEditLink.addClass("linkEdit");
	// $todoRemoveLink.addClass("linkRemove");

	if (todo.status !== 'В желаемом') {
		$todoEditLink.text("Добавить в желаемое");
		$todoEditLink.on("click", function() {
			var newDescription = todo.description + " [В желаемом]";
			if (newDescription !== null && newDescription.trim() !== "") {
				$.ajax({
					"url": "/todos/" + todo._id,
					"type": "PUT",
					"data": { "description": newDescription, "status": 'В желаемом'},
				}).done(function (responde) {
					callback();
				}).fail(function (err) {
					console.log("Произошла ошибка: " + err);
				});
			}
			return false;
		});	
		$todoListItem.append($todoEditLink);
	}
	// else {
	// 	$todoRemoveLink.text("Удалить из списка");
	// 	$todoRemoveLink.on("click", function () {
	// 		$.ajax({
	// 			url: "/users/:username/todos/" + todo._id,
	// 			type: "DELETE"
	// 		}).done(function (responde) {
	// 			callback();
	// 		}).fail(function (err) {
	// 			console.log("error on delete 'Todos'!");
	// 		});
	// 		return false;
	// 	});
	// 	$todoListItem.append($todoRemoveLink);
	// }
	return $todoListItem;
}

var main = function (toDoObjects) {
	"use strict";
	// создание пустого массива с вкладками
	var tabs = [];
	// добавляем вкладку История покупок
	tabs.push({
		"name": "Каталог",
		// создаем функцию content
		// так, что она принимает обратный вызов
		"content": function(callback) {
			$.getJSON("todos.json", function (toDoObjects) {
				var $content = $("<ul>");
				for (var i = toDoObjects.length-1; i>=0; i--) {
					var $todoListItem = liaWithEditOrDeleteOnClick(toDoObjects[i], function() {
						$(".tabs a:first-child span").trigger("click");
					});
					$content.append($todoListItem);
				}
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	// добавляем вкладку Список желаемого
	tabs.push({
		"name": "Список желаемого",
		"content": function(callback) {
			$.getJSON("todos.json", function (toDoObjects) {
				var $content, i;
				$content = $("<ul>");
				for (i = 0; i < toDoObjects.length; i++) {
					if (toDoObjects[i].status === 'В желаемом') {
						var $todoListItem = liaWithEditOrDeleteOnClick(toDoObjects[i], function() {
							$(".tabs a:nth-child(2) span").trigger("click");
						});
						$content.append($todoListItem);
					}
				}
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	// tabs.push({
	// 	"name": "Добавить в желаемое",
	// 	"content":function () {
	// 		$.get("todos.json", function (toDoObjects) {	
	// 			// создание $content для Добавить 
	// 			var $place = $("<h3>").text("Введите название телефона: "),
	// 				$input = $("<input>").addClass("description"), 
	// 				$button = $("<button>").text("Добавить"),
	// 				$content1 = $("<ul>");

	// 			$content1.append($input);
	// 			$("main .content").append($place);
	// 			$("main .content").append($content1);
	// 			$("main .content").append($button); 
				
	// 			function btnfunc() {
	// 				var price = Math.floor(Math.random() * (500 - 100)) + 100;
	// 				console.log(price);
	// 				var description = ('Название: ' + $input.val() + ' ; Цена: ' + price +'руб '),
	// 					// создаем новый элемент списка задач
	// 					newTodo = {"description":description, "status": 'В желаемом'};
	// 				$.post("todos", newTodo, function(result) {
	// 					$input.val("");
	// 					$(".tabs a:first-child span").trigger("click");
	// 				});
	// 			}
	// 			$button.on("click", function() {
	// 				btnfunc();
	// 			});
	// 			$input.on('keydown',function(e){
	// 				if (e.which === 13) {
	// 					btnfunc();
	// 				}
	// 			});
	// 		});
	// 	}
	// });

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
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});