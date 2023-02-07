$(function () {
  $("#changePassword").click(function () {
    const password = $("#password").val();
    const newPassword = $("#newPassword").val();
    const confirmPassword = $("#confirmPassword").val();
    if (newPassword.length < 6) {
      window.alert("Password must be more than 6 characters");
      return false;
    }
    if (newPassword !== confirmPassword) {
      window.alert("Confirm password is wrong");
      return false;
    }

    let body = {
      username: USERNAME,
      nickname: NICKNAME,
      password,
      newPassword,
    };
    var settings = {
      url: `${ENDPOINT}/admin`,
      method: "PATCH",
      timeout: 0,
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
      },
      error: function (e) {
        if (e.responseJSON.statusCode === 401) {
          window.location.replace(`${CLIENT}/login/index.html`);
        } else {
          window.alert(e.responseJSON.message);
        }
      },
    };

    $.ajax(settings).done(function (response) {
      window.location.replace(`${CLIENT}/admin/index.html`);
    });
  });
});
