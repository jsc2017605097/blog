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
                <img style="height:70px; width:70px" src=${blog.blogPhotoUrl} alt="">
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

    const data2 = response.data.result.slice(0, 3).map((blog) => {
      return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="single-blog-post post-style-3 mt-50 wow fadeInUpBig" data-wow-delay="0.2s">
                <!-- Post Thumbnail -->
                <div class="post-thumbnail">
                    <img src=${blog.blogPhotoUrl} alt="">
                    <!-- Post Content -->
                    <div class="post-content d-flex align-items-center justify-content-between">
                        <!-- Catagory -->
                        <div class="post-tag"><a href="#">${
                          blog.categoryId.name
                        }</a></div>
                        <!-- Headline -->
                        <a href="https://jsc2017605097.github.io/blog/single-blog.html?id=${blog._id}" class="headline">
                            <h5>${blog.title}</h5>
                        </a>
                        <!-- Post Meta -->
                        <div class="post-meta">
                            <p><a href="#" class="post-author">${blog.createdBy.nickname}</a> on <a href="#" class="post-date">${moment(
                              blog.createdAt
                            ).format("YYYY-MM-DD HH:mm:ss")}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });
    const html2 = data2.join("");
    $("#top3-story").html(html2);
  });
});
