//Проверка правильности введенных данных в форме "Регистрация пользователя"
function validReguser(f) {
    valid = true;
    errtext = "";
    var datain = { login: $("#login").val()};
    $.get( "/reguser/logincheck", datain)
    .done(function(dataout) {
    if ((dataout == "exist")){
      errtext+="Пользователь с таким именем уже существует. \n";
      valid = false;
      $("#login").addClass("is-invalid");
    }
    else if ($("#login").val().match(/^[a-z]/) === null){
          errtext += "Логин задан не правильно. \n";
          valid = false;
          $("#login").addClass("is-invalid");
        } else {
          $("#login").removeClass("is-invalid");
          $("#login").addClass("is-valid");
        }
    if (($("#password").val() != $("#checkpass").val())||($("#password").val() == "") ) {
      errtext += "Введенные пароли не совпадают. \n";
      valid = false;
      $("#password").addClass("is-invalid");
      $("#checkpass").addClass("is-invalid");
    } else {
      $("#password").removeClass("is-invalid");
      $("#password").addClass("is-valid");
      $("#checkpass").removeClass("is-invalid");
      $("#checkpass").addClass("is-valid");
    }
    if($("#email").val().match(/.+@.+\..+/i) === null) {
      errtext += "Адрес почты введен не правильно. \n";
      $("#email").addClass("is-invalid");
      valid = false;
    } else {
      $("#email").removeClass("is-invalid");
      $("#email").addClass("is-valid");
    }
    if(valid) {
      f.submit();
      $('#alertmsg').text("Регистрация завершена успешно.");
      $('#ErrWindow').modal('show');
    } else {
      $('#alertmsg').text(errtext);
      $('#ErrWindow').modal('show');
    }
})

}

//Запрос потверждения удаления данных из таблицы (модуль Админка)
function validAdmin(f) {
       if(confirm("Вы уверены что хотите удалить все данные из таблицы "+$("#tablename").val())) f.submit();
}



