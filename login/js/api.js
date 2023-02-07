// constant
const ENDPOINT = "https://dongtrunghathaocom-production.up.railway.app";
// const ENDPOINT = "http://10.2.22.124:3000";
const CLIENT = "http://10.2.22.124:9080";
const TOKEN_KEY = "token";
// login
$(function () {
  $("#login").click(function () {
    const password = $("#password").val();
    const username = $("#username").val();

    var settings = {
      url: `${ENDPOINT}/auth`,
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: JSON.stringify({
        username,
        password,
      }),
      error: function (e) {
        window.alert(e.responseJSON.message);
      },
    };

    $.ajax(settings).done(function (response) {
      window.localStorage.setItem(TOKEN_KEY, response.data);
      window.location.replace(`${CLIENT}/admin/index.html`);
    });
  });
});
