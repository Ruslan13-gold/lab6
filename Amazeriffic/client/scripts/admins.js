var main = function (AdminsObjects) {
	"use strict";
	var $input = $("<input>").addClass("username"),
		$butRegister = $("<button>").text("Создать аккаунт"),
		$butLogin = $("<button>").text("Войти в аккаунт");

	$butRegister.on("click", function() {
		var adminname = $input.val();
		if (adminname !== null && adminname.trim() !== "") {
			var newAdmin = {"adminname": adminname};
			$.post("admins", newAdmin, function(result) {
				console.log(result);
				// отправляем на клиент
				AdminsObjects.push(newAdmin);
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
		var adminname = $input.val();
		if (adminname !== null && adminname.trim() !== "") {
			var loginAdmin = {"adminname": adminname};
			$.ajax({
				'url': '/admins/'+adminname,
				'type': 'GET'
			}).done(function(responde) {
				window.location.replace('admins/' + adminname + '/');
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
	$.getJSON("admins.json", function (AdminsObjects) {
		main(AdminsObjects);
	});
});
