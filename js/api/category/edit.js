$(function () {
  $("#saveCategory").click(function () {
    var _id = getUrlParameter("id");
    const photoUrl = document.getElementById("upload-img").src;
    const categoryName = $("#categoryName").val();
    var body = { CategoryPhotoUrl: photoUrl, name: categoryName };
    var settings = {
      url: `${ENDPOINT}/category/${_id}`,
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
        `${CLIENT}/admin/category/detail.html?id=${response.data._id}`
      );
    });
  });
  // delete
  $("#deleteCategory").click(function () {
    var _id = getUrlParameter("id");

    var settings = {
      url: `${ENDPOINT}/category/${_id}`,
      method: "DELETE",
      timeout: 0,
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
    let text =
      "Are you sure delete this category( delete all blog in category)?";
    if (confirm(text) == true)
      $.ajax(settings).done(function (response) {
        window.location.replace(`${CLIENT}/admin/category/list.html`);
      });
  });
});
