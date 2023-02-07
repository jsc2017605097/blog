$(function () {
  $("#changeNickname").click(function () {
    const nickname = $("#nickname").val();
    var body = { nickname };
    var settings = {
      url: `${ENDPOINT}/admin/change-nickname`,
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
      window.location.replace(
        `${CLIENT}/admin/account/myprofile.html`
      );
    });
  });
});
