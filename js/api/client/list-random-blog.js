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
    const data = response.data.slice(0, 2).map((blog) => {
      return `
        <div class="col-12 col-md-6">
            <!-- Single Blog Post -->
            <div class="single-blog-post wow fadeInUpBig" data-wow-delay="0.2s">
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
                    <p>How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in...</p>
                    <!-- Post Meta -->
                    <div class="post-meta">
                        <p><a href="#" class="post-author">Katy Liu</a> on <a href="#" class="post-date">${moment(
                          blog.createdAt
                        ).format("YYYY-MM-DD HH:mm:ss")}</a></p>
                    </div>
                </div>
            </div>
        </div>`;
    });
    let html = data.join("");
    html += `
    <div class="col-12">
         <div class="world-catagory-slider2 owl-carousel wow fadeInUpBig" data-wow-delay="0.4s">
            <!-- ========= Single Catagory Slide ========= -->`;
    const data2 = response.data.slice(2, 12);
    for (let i = 0; i < data2.length; i = i + 4) {
      html += `
        <div class="single-cata-slide">
            <div class="row">
                ${generateRandomBlog(data2[i])}
                ${generateRandomBlog(data2[i + 1])}
                ${generateRandomBlog(data2[i + 2])}
                ${generateRandomBlog(data2[i + 3])}
            </div>
        </div>`;
    }
    html += `</div>
    </div>`;
    $("#random-blog").html(html);
  });
});

function generateRandomBlog(blog) {
  return `
    <div class="col-12 col-md-6">
        <!-- Single Blog Post -->
        <div class="single-blog-post post-style-2 d-flex align-items-center mb-1">
            <!-- Post Thumbnail -->
            <div class="post-thumbnail">
                <img style="height:97px;width:97px" src=${
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
        </div>
    </div>`;
}
