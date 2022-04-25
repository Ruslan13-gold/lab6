var ToDo = require("../models/ToDo.js"),
	User = require("../models/user.js"),
	AllUsersControllers = {};

AllUsersControllers.index = function (req, res) { 
	var username = req.params.username || null,
		respondWithToDos;
	respondWithToDos = function (query) { 
		ToDo.find(query, function (err, toDos) {
			if (err !== null) {
				res.json(500, err);
			} else {
				res.status(200).json(toDos);
			}
		});
	};
	if (username !== null) {
		User.find({"username": username}, function (err, result) {
			if (err !== null) {
				res.json(500, err);
			} else if (result.length === 0) {
				res.status(404).json({"result_length": 0});
			} else {
				respondWithToDos({});
			}
		});
	} else {
		respondWithToDos({});
	}
};

module.exports = AllUsersControllers;