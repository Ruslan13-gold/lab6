var express = require("express"), http = require("http"),
	mongoose = require("mongoose"),
	ToDosController = require("./controllers/todos_controllers.js"),
	UsersController = require("./controllers/users_controllers.js"),
	ModerController = require("./controllers/moder_controllers.js"),
	app = express(); 

http.createServer(app).listen(3000);
app.use('/',express.static(__dirname + "/client"));
app.use('/user/:username',express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/amazeriffic', {
	useNewUrlParser: true, useUnifiedTopology: true 
}).then(res => { console.log("DB Connected!")
}).catch(err => { console.log(Error, err.message); });

app.get("/todos.json", ToDosController.index);
app.get("/todos/:id", ToDosController.show); 
app.post("/todos", ToDosController.create);
app.put("/todos/:id", ToDosController.update);
app.delete("/todos/:id", ToDosController.destroy);

app.get("/users/:username/todos.json", ToDosController.index);
app.post("/users/:username/todos", ToDosController.create);
app.put("/users/:username/todos/:id", ToDosController.update);
app.delete("/users/:username/todos/:id", ToDosController.destroy);

app.get("/users.json", UsersController.index); 
app.post("/users", UsersController.create);
app.get("/users/:username", UsersController.show);
app.delete("/users/:username", UsersController.destroy);

app.get("/moders.json", ModerController.index); 
app.post("/moders", ModerController.create);
app.get("/moders/:modername", ModerController.show);

app.get("/moders/:modername/todos.json", ToDosController.index);
app.post("/moders/:modername/todos", ToDosController.create);
app.put("/moders/:modername/todos/", ToDosController.update);
app.delete("/moders/:modername/todos/", ToDosController.destroy);