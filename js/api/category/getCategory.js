$(document).ready(function () {
  var _id = getUrlParameter("id");
  var settings = {
    url: `${ENDPOINT}/category/${_id}`,
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
    const img = document.getElementById("upload-img");
    img.src = response.data.CategoryPhotoUrl;
    img.style.height = "250px";
    $("#categoryName").val(response.data.name);
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
