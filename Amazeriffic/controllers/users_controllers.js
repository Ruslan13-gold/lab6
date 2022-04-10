var User = require("../models/user.js"), 
    ToDo = require("../models/ToDo.js"),
	UsersController = {},
	mongoose = require("mongoose");


UsersController.index = function (req, res) {
	console.log('Вызвано действие: UsersController.index');
	res.send(200);
};

// Отобразить пользователя
UsersController.show = function (req, res) {
	console.log("вызвано действие: показасть");
	res.send(200);
};

// Создать нового пользователя
UsersController.create = function (req, res) {
	console.log("вызвано действие: создать");
	res.send(200);
};

// Обновить существующего пользователя
UsersController.update = function (req, res) {
	console.log("вызвано действие: обновить");
	res.send(200);
};

// Удалить существующего пользователя
UsersController.destroy = function (req, res) {
	console.log("destroy action called");
	res.send(200);
};
module.exports = UsersController;
