$(document).ready(function () {
  var settings = {
    url: `${ENDPOINT}/blog/find-random`,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    error: function (e) {
      console.log(e.responseJSON.message);
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response.data);
  });
});
