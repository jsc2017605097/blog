$(document).ready(function () {
    var settings = {
      url: `${ENDPOINT}/banner/`,
      method: "GET",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      error: function (e) {
        console.log("Server error, please connect again!");
      },
    };
  
    $.ajax(settings).done(function (response) {
      const html2 = response.map(banner=>{
        return ` <div class="single-hero-slide bg-img background-overlay" style="background-image: url(${banner.url});"></div>
        `
      })
      $("#banner").html(html2.join(""));
      var script = document.createElement("script");
    script.src = "js/plugins.js";
    var script2 = document.createElement("script");
    script2.src = "js/active.js";
    });
  });
  

  