$(function () {
    $("#createBanner").click(function () {
        const photoUrl = document.getElementById("upload-img").src;
        var body = {
            url: photoUrl
        };
        var settings = {
            url: `${ENDPOINT}/banner`,
            method: "POST",
            timeout: 0,
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${
                    window.localStorage.getItem(TOKEN_KEY)
                }`
            },
            error: function (e) {
                if (e.responseJSON.statusCode === 401) {
                    window.location.replace(`${CLIENT}/login/index.html`);
                } else {
                    window.alert(e.responseJSON.message);
                }
            }
        };

        $.ajax(settings).done(function (response) {
            window.location.replace(`${CLIENT}/admin/banner/list.html`);
        });
    });

    $("#saveBanner").click(function () {
        const photoUrl = document.getElementById("upload-img").src;
        
        var _id = getUrlParameter("id");
        var body = {
            url: photoUrl
        };
        var settings = {
            url: `${ENDPOINT}/banner/${_id}`,
            method: "PATCH",
            timeout: 0,
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${
                    window.localStorage.getItem(TOKEN_KEY)
                }`
            },
            error: function (e) {
                if (e.responseJSON.statusCode === 401) {
                    window.location.replace(`${CLIENT}/login/index.html`);
                } else {
                    window.alert(e.responseJSON.message);
                }
            }
        };

        $.ajax(settings).done(function (response) {
            window.location.replace(`${CLIENT}/admin/banner/list.html`);
        });
    });
});

$(document).ready(function () {
    $("#bannerList").html("Loading...");
    var settings = {
        url: `${ENDPOINT}/banner/`,
        method: "GET",
        timeout: 0,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${
                window.localStorage.getItem(TOKEN_KEY)
            }`
        },
        error: function (e) {
            if (e.responseJSON.statusCode === 401) {
                window.location.replace(`${CLIENT}/login/index.html`);
            } else {
                window.alert(e.responseJSON.message);
            }
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response)
        if (response.length === 0) 
            $("#bannerList").html("No data exist");
        
        let html = `<table id="bannerList" class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>`;
        response.map((c, index) => {
            html += `<tr>
              <td>${
                index + 1
            }</td>
              <td><img src=${
                c.url
            } height='50px' width='50px' style='margin-right:10px' /></td>
            <td><a href=${CLIENT}/admin/banner/detail.html?id=${
        c._id
      }><img src='https://jsc2017605097.github.io/blog/admin/img/action.svg' /></a></td>
              </tr>`;
        });
        html += `</tbody>`;
        $("#bannerList").html(html);

        var _id = getUrlParameter("id");
        if(_id){
            const banner = response.find(b=>b._id.toString() === _id.toString());
            document.getElementById("upload-img").src = banner.url;
        }
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
