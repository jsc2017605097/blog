const ENDPOINT = "https://dongtrunghathaocom-production.up.railway.app";
let loadmore = 10;
$(document).ready(function () {
  loadmore = 10;
  loadmoreFunc();
});

function loadmoreFunc() {
  var _id = getUrlParameter("id");
  var keyword = getUrlParameter("keyword");
  var url = "${ENDPOINT}/blog?offset=0&&limit=${loadmore}";
  if (keyword)
    url = `${ENDPOINT}/blog?keyword=${keyword}&&offset=0&&limit=${loadmore}`;
  if (_id)
    url = `${ENDPOINT}/blog?categoryId=${_id}&&offset=0&&limit=${loadmore}`;
  var settings = {
    url,
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
    console.log(response.data);
    const data = response.data.result.map((blog) => {
      return `
            <div class="single-blog-post post-style-10 d-flex align-items-center">
                <!-- Post Thumbnail -->
                <div class="post-thumbnail">
                    <img src=${blog.blogPhotoUrl} alt="">
                </div>
                <!-- Post Content -->
                <div class="post-content">
                    <a href="#" class="headline">
                        <h5>${blog.title}</h5>
                    </a>
                    <!-- Post Meta -->
                    <div class="post-meta">
                        <p><a href="https://jsc2017605097.github.io/blog/single-blog.html?id=${
                          blog._id
                        }" class="post-author">${
        blog.createdBy.nickname
      }</a> on <a href="#" class="post-date">${moment(blog.createdAt).format(
        "YYYY-MM-DD HH:mm:ss"
      )}</a></p>
                    </div>
                </div>
            </div>`;
    });
    $("#category-list").html(data.join(""));
  });
}

$(function () {
  $("#loadmoreBtn").click(function () {
    loadmore += 10;
    loadmoreFunc();
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
