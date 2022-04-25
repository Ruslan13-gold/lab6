var mongoose = require("mongoose");
// Это модель Mongoose для пользователей
var ModerSchema = mongoose.Schema({
	modername: String,
	id: String
});
var Moder = mongoose.model("Moder", ModerSchema);
module.exports = Moder;