var ToDo = require("../models/todo.js"),
	mongoose = require("mongoose");
	ToDosController = {};

ToDos ToDosController.index = function (req, res) { 
	console.log("вызвано действие: индекс");
	res.send(200);
};

ToDos ToDosController.create = function (req, res) {
	console.log("вызвано действие: создать");
	res.send(200);
};

ToDos ToDosController.show = function (req, res) {
	console.log("вызвано действие: показать");
	res.send(200);
};

ToDos ToDosController.destroy = function (req, res) {
	console.log("destroy action called");
	res.send(200);
}

ToDos ToDosController.update = function (req, res) {
	console.log("вызвано действие: обновить");
	res.send(200);
}

module.exports = ToDosController;