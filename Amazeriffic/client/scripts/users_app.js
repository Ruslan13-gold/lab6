var organizeByTags = function (toDoObjects) { var tags = [];
	toDoObjects.forEach(function (toDo) {
		toDo.tags.forEach(function (tag) {
			if (tags.indexOf(tag) === -1) { tags.push(tag); } });
	}); 
	var tagObjects = tags.map(function (tag) {
		var toDosWithTag = [];  toDoObjects.forEach(function (toDo) {
			if (toDo.tags.indexOf(tag) !== -1) { toDosWithTag.push(toDo.description); } });
		return { "name": tag, "toDos": toDosWithTag }; });
	return tagObjects;
};

var main = function (toDoObjects) { "use strict"; var tabs = [];
	tabs.push({
		"name": "Каталог",
		"content":function (callback) {
			$.get("todos.json", function (toDoObjects) {				
				var organizedByTag = organizeByTags(toDoObjects), $content;
				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name); $content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description); $content.append($li); });
					$("main .content").append($tagName); $("main .content").append($content);
				}); callback(null,$content);
			}).fail(function (jqXHR, textStatus, error) { callback(error, null); }); }
	});
	
	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""), $spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement); $("main .tabs").append($aElement);
		$spanElement.on("click", function () { var $content;
			$(".tabs a span").removeClass("active"); $spanElement.addClass("active");
			$("main .content").empty();
			tab.content(function (err, $content) {
				if (err !== null) { alert ("Возникла проблема при обработке запроса: " + err); } 
				else { $("main .content").append($content); } }); return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
}

$(document).ready(function() {
	$.getJSON("todos.json", function (toDoObjects) { main(toDoObjects); });
});