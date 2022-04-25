var main = function (ModersObjects) {
	"use strict";
	var $input = $("<input>").addClass("username"),
		$butRegister = $("<button>").text("Создать аккаунт"),
		$butLogin = $("<button>").text("Войти в аккаунт");

	$butRegister.on("click", function() {
		var modername = $input.val();
		if (modername !== null && modername.trim() !== "") {
			var newModers = {"modername": modername};
			$.post("moders", newModers, function(result) {
				console.log(result);
				// отправляем на клиент
				ModersObjects.push(newModers);
			}).done(function(responde) {
				console.log(responde);
				alert('Аккаунт успешно создан!\nНажмите "Войти", чтобы продолжить')
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
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
		var modername = $input.val();
		if (modername !== null && modername.trim() !== "") {
			var loginModer = {"modername": modername};
			$.ajax({
				'url': '/moders/'+modername,
				'type': 'GET'
			}).done(function(responde) {
				window.location.replace('moders/' + modername + '/');
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
			});
		}
	});

	$("main .authorization").append($input);
	$("main .authorization").append($butLogin);
	$("main .authorization").append($butRegister);
}

$(document).ready(function() {
	$.getJSON("moders.json", function (ModersObjects) {
		main(ModersObjects);
	});
});
