function validateForm() {
    valid = true;
    errtext= "";
    if (document.reguser_form.password.value != document.reguser_form.checkpass.value) {
      errtext+="Введенные пароли не совпадают. \n";
      valid = false;
    }
    if(document.reguser_form.email.value.match(/@/)===null)
    {
      errtext+="Адрес почты введен не правильно. \n";
      valid = false;
    }
    if(valid){
      $('#alertmsg').text("Регистрация завершена успешно.");
      $('#ErrWindow').modal('show');
    } else {
      $('#alertmsg').text(errtext);
      $('#ErrWindow').modal('show');
    }
    return valid;
}