$(function () {
  $("#createCategory").click(function () {
    const photoUrl = document.getElementById("upload-img").src;
    const categoryName = $("#categoryName").val();
    var body = { CategoryPhotoUrl: photoUrl, name: categoryName };
    var settings = {
      url: `${ENDPOINT}/category`,
      method: "POST",
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
        `${CLIENT}/admin/category/detail.html?id=${response.data._id}`
      );
    });
  });
});
