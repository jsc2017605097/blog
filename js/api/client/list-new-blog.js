const ENDPOINT = "https://dongtrunghathaocom-production.up.railway.app";
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
    const data = response.data.result.slice(0, 5).map((blog) => {
      return `
      <div class="single-blog-post" style="margin-left:10px;margin-right:10px">
            <!-- Post Thumbnail -->
            <div class="post-thumbnail">
                <img src=${blog.blogPhotoUrl} alt="">
                <!-- Catagory -->
                <div class="post-cta"><a href="#">${
                  blog.categoryId.name
                }</a></div>
            </div>
            <!-- Post Content -->
            <div class="post-content">
                <a href="#" class="headline">
                    <h5>${blog.title}</h5>
                </a>
                <!-- Post Meta -->
                <div class="post-meta">
                    <p><a href="#" class="post-author">Katy Liu</a> on <a href="#" class="post-date">${moment(
                      blog.createdAt
                    ).format("YYYY-MM-DD HH:mm:ss")}</a></p>
                </div>
            </div>
        </div>`;
    });
    let html = data.join("");
    $("#new-1").html(html);

    const data2 = response.data.result.slice(5, 9).map((blog) => {
      return `
        <div class="single-blog-post post-style-2 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.2s">
            <!-- Post Thumbnail -->
            <div class="post-thumbnail">
                <img style="height:95px; width:95px" src=${
                  blog.blogPhotoUrl
                } alt="">
            </div>
            <!-- Post Content -->
            <div class="post-content">
                <a href="#" class="headline">
                    <h5>${blog.title}</h5>
                </a>
                <!-- Post Meta -->
                <div class="post-meta">
                    <p><a href="#" class="post-author">Katy Liu</a> on <a href="#" class="post-date">${moment(
                      blog.createdAt
                    ).format("YYYY-MM-DD HH:mm:ss")}</a></p>
                </div>
            </div>
        </div>`;
    });
    let html2 = data2.join("");
    $("#new-2").html(html2);

    var script = document.createElement("script");
    script.src = "js/plugins.js";
    var script2 = document.createElement("script");
    script2.src = "js/active.js";
    document.head.appendChild(script);
    document.head.appendChild(script2);
  });
});
