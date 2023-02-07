$(function () {
  $("#createBlog").click(function () {
    const blogPhotoUrl = document.getElementById("upload-img").src;
    const title = $("#title").val();
    const categoryId = $("#categoryId").val();
    const content = CKEDITOR.instances.content.getData();

    var body = { blogPhotoUrl, title, content, categoryId };
    var settings = {
      url: `${ENDPOINT}/blog`,
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
        `${CLIENT}/admin/blog/detail.html?id=${response.data._id}`
      );
    });
  });
});

$(document).ready(function () {
  $("#categoryId").html("<option>Loading...</option>");
  var settings = {
    url: `${ENDPOINT}/category/`,
    method: "GET",
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

  $.ajax(settings).done(function (response) {
    let category = null;
    response.data.forEach((element) => {
      category += `<option value=${element._id} data-img-src=${element.CategoryPhotoUrl}>${element.name}</option>`;
    });
    $("#categoryId").html(category);
    const categoryUrl = $("#categoryId option:selected").attr("data-img-src");
    const categoryImg = `<img src=${categoryUrl} width='150px' />`;
    $("#categoryImg").html(categoryImg);
  });
});

$(function () {
  $("#categoryId").change(function () {
    const categoryUrl = $("#categoryId option:selected").attr("data-img-src");
    const categoryImg = `<img src=${categoryUrl} width='150px' />`;
    $("#categoryImg").html(categoryImg);
  });
});
