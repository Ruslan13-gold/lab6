var Moder = require("../models/moder.js"), ToDo = require("../models/ToDo.js"), 
	ModerController = {}, mongoose = require("mongoose");

ModerController.index = function(req, res) {
	console.log('Вызвано действие: ModerController.index');
	Moder.find(function (err, moders) {
  		if (err !== null) { res.json(500, err);
  		} else { res.status(200).json(moders); }
  	});
};

ModerController.show = function(req, res) {
	console.log('Вызвано действие: вход от имени модератора');
	Moder.find({'modername': req.params.modername}, function(err, result) {
	if (err) { console.log(err); } 
	else if (result.length !== 0) { res.sendfile('./client/moder_list.html');} 
	else { res.send(404); }
	});
};

ModerController.create = function(req, res) {
	console.log('Вызвано действие: создать пользователя moder');
	var modername = req.body.modername; 
	Moder.find({"modername": modername}, function (err, result) {
	    if (err) { console.log(err); res.send(500, err);
	    } else if (result.length !== 0) {
	        res.status(501).send("Пользователь уже существует");
	        console.log(err);   
	        console.log("Пользователь уже существует"); 
	    } else {
	        var newModer = new Moder({ "modername": modername });
	        newModer.save(function(err, result) { console.log(err); 
	            if (err !== null) { res.json(500, err); 
	            } else { res.json(200, result); console.log(result); }
	        });
	    }
	}); 
};

module.exports = ModerController;