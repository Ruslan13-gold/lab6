var mongoose = require("mongoose");
var ModerSchema = mongoose.Schema({ modername: String, id: String });
var Moder = mongoose.model("Moder", ModerSchema);
module.exports = Moder;