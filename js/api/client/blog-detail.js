const ENDPOINT = "https://dongtrunghathaocom-production.up.railway.app";

$(document).ready(function () {
  var _id = getUrlParameter("id");
  var settings = {
    url: `${ENDPOINT}/blog/${_id}?viewer=client`,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    error: function (e) {
      window.alert("Server error, please access again");
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response.data);
    $("#category-name").html(response.data.categoryId.name);
    $("#blog-title").html(response.data.title);
    $("#blog-author").html(response.data.createdBy.nickname);
    $("#blog-date").html(
      moment(response.data.createdAt).format("YYYY-MM-DD HH:mm:ss")
    );
    $("#blog-content").html(response.data.content);
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
// top story
$(document).ready(function () {
  var settings = {
    url: `${ENDPOINT}/blog?sortField=views&&sortType=-1&&offset=0&&limit=5`,
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
    const data = response.data.result.map((blog) => {
      return `  
            <div class="single-blog-post post-style-2 d-flex align-items-center widget-post">
                <!-- Post Thumbnail -->
                <div class="post-thumbnail">
                    <img src=${blog.blogPhotoUrl} alt="">
                </div>
                <!-- Post Content -->
                <div class="post-content">
                    <a href="https://jsc2017605097.github.io/blog/single-blog.html?id=${blog._id}" class="headline">
                        <h5 class="mb-0">${blog.title}</h5>
                    </a>
                </div>
            </div>`;
    });
    const html = data.join("");
    $("#top-story").html(html);
  });
});
// blog news
$(document).ready(function () {
  var settings = {
    url: `${ENDPOINT}/blog?offset=0&&limit=3`,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    error: function (e) {
      window.alert("Server error,please access again!");
    },
  };

  $.ajax(settings).done(function (response) {
    const data = response.data.result.map((blog) => {
      return ` 
            <div class="col-12 col-md-6 col-lg-4">
                <div class="single-blog-post">
                    <!-- Post Thumbnail -->
                    <div class="post-thumbnail">
                        <img src=${blog.blogPhotoUrl} alt="">
                        <!-- Catagory -->
                        <div class="post-cta"><a href="catagory.html?id=${
                          blog.categoryId._id
                        }">${blog.categoryId.name}</a></div>
                    </div>
                    <!-- Post Content -->
                    <div class="post-content">
                        <a href="https://jsc2017605097.github.io/blog/single-blog.html?id=${
                          blog._id
                        }" class="headline">
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
                </div>
            </div>`;
    });
    $("#blog-news").html(data.join(""));
  });
});
