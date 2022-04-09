User.find({}, function (err, result) {
	if (err !== null) {
		console.log("Что-то идет не так");
		console.log(err);
	} else if (result.length === 0) {
		console.log("Создание тестового пользователя...");
		var exampleUser = new User({"username":"usertest"});
		exampleUser.save(function (err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log("Тестовый пользователь сохранен");
			}
		});
	}
});



var User = require("../models/user.js"),
	mongoose = require("mongoose");
	var Users IDontroller = {};

Users IDontroller.index = function (req, res) {
	console.log("вызвано действие: индекс");
	res.send(200);
};

// Отобразить пользователя
Users IDontroller.show = function (req, res) {
	console.log("вызвано действие: показать");
	res.send(200);
};

// Создать нового пользователя
Users IDontroller.create = function (req, res) {
	console.log("вызвано действие: создать");
	res.send(200);
};

// Обновить существующего пользователя
Users IDontroller.update = function (req, res) {
	console.log("вызвано действие: обновить");
	res.send(200);
};

// Удалить существующего пользователя
Users IDontroller.destroy = function (req, res) {
	console.log("destroy action called");
	res.send(200);
};
module.exports = Users IDontroller;
