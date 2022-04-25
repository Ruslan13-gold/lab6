var mongoose = require("mongoose");
// Это модель Mongoose для пользователей
var AdminSchema = mongoose.Schema({
	adminname: String,
	id: String
});
var Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;