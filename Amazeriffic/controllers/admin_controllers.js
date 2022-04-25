var Admin = require("../models/admin.js"),
	ToDo = require("../models/ToDo.js"), 
	AdminController = {},
	mongoose = require("mongoose");

AdminController.index = function(req, res) {
	console.log('Вызвано действие: AdminController.index');
	Admin.find(function (err, admins) {
  		if (err !== null) {
			res.json(500, err);
  		} else {
  			res.status(200).json(admins);
  		}
  	});
};

AdminController.show = function(req, res) {
	console.log('Вызвано действие: вход от имени администратора');
	Admin.find({'adminname': req.params.adminname}, function(err, result) {
	if (err) {
		console.log(err);
	} else if (result.length !== 0) {
		res.sendfile('./client/admin_list.html');
	} else {
	  res.send(404);
	}
	});
};

AdminController.create = function(req, res) {
	console.log('Вызвано действие: создать пользователя admin');
	var adminname = req.body.adminname; 
	console.log(adminname);
	Admin.find({"adminname": adminname}, function (err, result) {
	    if (err) {
	        console.log(err);
	        res.send(500, err);
	    } else if (result.length !== 0) {
	        res.status(501).send("Пользователь уже существует");
	        console.log(err);   
	        console.log("Пользователь уже существует"); 
	    } else {
	        var newAdmin = new Admin({
	            "adminname": adminname
	        });
	        newAdmin.save(function(err, result) {
	            console.log(err); 
	            if (err !== null) {
	                res.json(500, err); 
	            } else {
	                res.json(200, result);
	                console.log(result); 
	            }
	        });
	    }
	}); 
};

module.exports = AdminController;