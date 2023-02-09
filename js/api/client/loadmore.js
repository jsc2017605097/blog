let loadmore = 4;
$(document).ready(function () {
  loadmore = 4;
  loadmoreFunc();
});

$(function () {
  $("#loadmoreBtn").click(function () {
    loadmore += 4;
    loadmoreFunc();
  });
});

function loadmoreFunc() {
  var settings = {
    url: `${ENDPOINT}/blog?offset=0&&limit=${loadmore}`,
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
    let html = `
            <div class="title">
               <h5>Latest Articles</h5>
            </div>
        `;
    const data = response.data.result.map((blog) => {
      return `
            <div class="single-blog-post post-style-4 d-flex align-items-center wow fadeInUpBig" data-wow-delay="0.2s">
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
                        <p><a href="#" class="post-author">Katy Liu</a> on <a href="#" class="post-date">${moment(
                          blog.createdAt
                        ).format("YYYY-MM-DD HH:mm:ss")}</a></p>
                    </div>
                </div>
            </div>`;
    });
    html += data.join("");
    $("#new-3").html(html);
  });
}
