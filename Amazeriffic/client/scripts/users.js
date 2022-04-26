var main = function (UsersObjects) { "use strict";
	var $input = $("<input>").addClass("username"),
		$butRegister = $("<button>").text("Создать аккаунт"),
		$butLogin = $("<button>").text("Войти в аккаунт");	

	$butRegister.on("click", function() {
		var username = $input.val();
		if (username !== null && username.trim() !== "") {
			var newUser = {"username": username};
			$.post("users", newUser, function(result) {
				console.log(result); UsersObjects.push(newUser);
			}).done(function(responde) { console.log(responde);
				alert('Аккаунт успешно создан!\nНажмите "Войти", чтобы продолжить')
			}).fail(function(jqXHR, textStatus, error) { console.log(error);
				if (jqXHR.status === 501) {
					alert("Такой пользователь уже существует!\nИзмените логин и повторите "
						+ "попытку");
				} else {					
					alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
				}
			});
		}
	});

	$butLogin.on("click", function() {
		var username = $input.val();
		if (username !== null && username.trim() !== "") {
			var loginUser = {"username": username};
			$.ajax({ 'url': '/users/'+username, 'type': 'GET'
			}).done(function(responde) {
				window.location.replace('users/' + username + '/');
			}).fail(function(jqXHR, textStatus, error) { console.log(error);
				alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus); });
		}
	});
	$("main .authorization").append($input);
	$("main .authorization").append($butLogin);
	$("main .authorization").append($butRegister);
}

$(document).ready(function() {
	$.getJSON("users.json", function (UsersObjects) { main(UsersObjects); });
});