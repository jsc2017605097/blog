$(document).ready(function () {
  var _id = getUrlParameter("id");
  var settings = {
    url: `${ENDPOINT}/blog/${_id}`,
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
    $("#title").val(response.data.title);
    document.getElementById("upload-img").src = response.data.blogPhotoUrl;
    document.getElementById("upload-img").style.height = "250px";

    CKEDITOR.instances.content.setData(response.data.content);
    getCategory(response.data.categoryId._id);
  });
});

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

function getCategory(categoryCurrent) {
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
      if (element._id === categoryCurrent)
        category += `<option selected value=${element._id} data-img-src=${element.CategoryPhotoUrl}>${element.name}</option>`;
      else
        category += `<option value=${element._id} data-img-src=${element.CategoryPhotoUrl}>${element.name}</option>`;
    });
    $("#categoryId").html(category);
    const categoryUrl = $("#categoryId option:selected").attr("data-img-src");
    const categoryImg = `<img src=${categoryUrl} width='150px' />`;
    $("#categoryImg").html(categoryImg);
  });
}

$(function () {
  $("#categoryId").change(function () {
    const categoryUrl = $("#categoryId option:selected").attr("data-img-src");
    const categoryImg = `<img src=${categoryUrl} width='150px' />`;
    $("#categoryImg").html(categoryImg);
  });
  // save blog
  $("#saveBlog").click(function () {
    var _id = getUrlParameter("id");
    const blogPhotoUrl = document.getElementById("upload-img").src;
    const title = $("#title").val();
    const categoryId = $("#categoryId").val();
    const content = CKEDITOR.instances.content.getData();
    const isDisplayAtBanner = $("#isDisplayAtBanner").is(":checked");

    var body = { blogPhotoUrl, title, content, categoryId,isDisplayAtBanner };
    var settings = {
      url: `${ENDPOINT}/blog/${_id}`,
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
        `${CLIENT}/admin/blog/detail.html?id=${response.data._id}`
      );
    });
  });
  // delete
  $("#deleteBlog").click(function () {
    var _id = getUrlParameter("id");

    var settings = {
      url: `${ENDPOINT}/blog/${_id}`,
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
    let text = `Are you sure delete "${$("#title").val()}"?`;
    if (confirm(text) == true)
      $.ajax(settings).done(function (response) {
        window.location.replace(`${CLIENT}/admin/blog/list.html`);
      });
  });
});
