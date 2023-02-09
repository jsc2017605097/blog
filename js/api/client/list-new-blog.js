const ENDPOINT = "http://10.2.22.135:3000";
$(document).ready(function () {
  var settings = {
    url: `${ENDPOINT}/blog`,
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
