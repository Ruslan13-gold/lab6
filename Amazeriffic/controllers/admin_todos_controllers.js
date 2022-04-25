var Admin = require("../models/admin.js"),
	User = require("../models/user.js"),
	ToDo = require("../models/ToDo.js"),
	UsersAndAdminToDosController = {};

UsersAndAdminToDosController.index = function(req, res) {
	console.log('Вызвано действие: UsersAndAdminToDosController.index');
	User.find(function (err, users) {
  		if (err !== null) {
			res.json(500, err);
  		} else {
  			res.status(200).json(users);
  		}
  	});
};

// Обновить существующего пользователя 
UsersAndAdminToDosController.update = function (req, res) { 
	console.log("Вызвано действие: обновить пользователя");
	var username = req.params.username;
	console.log("Старое имя пользователя: " + username);
	var newUsername = {$set: {username: req.body.username}};
	console.log("Новое имя пользователя: " + req.body.username);
	User.updateOne({"username": username}, newUsername, function (err,user) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (user.n === 1 && user.nModified === 1 && user.ok === 1) {
				console.log('Изменен');
				res.status(200).json(user);
			} else {
				res.status(404);
			}
		}
	});
};

// Удалить существующего пользователя 
UsersAndAdminToDosController.destroy = function (req, res) { 
	console.log("Вызвано действие: удалить пользователя");
	var username = req.params.username;
	User.find({"username": username}, function (err, result) {
		if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
        	console.log("Удаляем все todo с 'owner': " + result[0]._id);
        	ToDo.deleteMany({"owner": result[0]._id}, function (err, todo) {
		        console.log("Удаляем пользователя");
				User.deleteOne({"username": username}, function (err, user) {
					if (err !== null) {
						res.status(500).json(err);
					} else {
						if (user.n === 1 && user.ok === 1 && user.deletedCount === 1) {
							res.status(200).json(user);
						} else {
							res.status(404).json({"status": 404});
						}
					}
				});
        	});
        } else {
            res.status(404).send("Пользователь не существует");
            console.log(err);   
        }
	});
}

module.exports = UsersAndAdminToDosController;