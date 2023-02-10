$(document).ready(function () {
  var settings = {
    url: `${ENDPOINT}/category/`,
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
    let more = [];
    if (response.data.length > 3) {
      more = response.data.slice(3);
      response.data = response.data.slice(0, 3);
    }
    const data2 = response.data.map((c) => {
      return `<a class="dropdown-item" href="https://jsc2017605097.github.io/blog/catagory.html?id=${c._id}">${c.name}</a>`;
    });
    $("#nav-category").html(data2);

    const data = response.data.map((category) => {
      return `
                <li class="nav-item">
                    <a class="nav-link" id="tab1"  href="catagory.html?id=${category._id}" role="tab" aria-controls="world-tab-1" aria-selected="true">${category.name}</a>
                </li>
            `;
    });
    let html = `<li class="title">Bài đăng mới</li>`;
    html += `<li class="nav-item">
        <a class="nav-link active" id="tab1" data-toggle="tab" href="#world-tab-1" role="tab" aria-controls="world-tab-1" aria-selected="true">All</a>
        </li>`;
    html += data.join("");
    if (more.length > 0) {
      html += `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">More</a>
                <div class="dropdown-menu">`;
      html += more
        .map((c) => {
          return `<a class="nav-link" id="tab7" data-toggle="tab" href="catagory.html?id=${c._id}" role="tab" aria-controls="world-tab-7" aria-selected="false">${c.name}</a>
            `;
        })
        .join("");
      html += `</div>
        </li>`;
    }
    $("#category").html(html);
    let html2 = `<li class="title">Bài đăng quan tâm</li>`;
    html2 += `<li class="nav-item">
    <a class="nav-link active" id="tab1" data-toggle="tab" href="#world-tab-1" role="tab" aria-controls="world-tab-1" aria-selected="true">All</a>
    </li>`;
    html2 += data.join("");
    if (more.length > 0) {
      html2 += `
                  <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">More</a>
                      <div class="dropdown-menu">`;
      html2 += more
        .map((c) => {
          return `<a class="nav-link" id="tab7" data-toggle="tab" href="catagory.html?id=${c._id}" role="tab" aria-controls="world-tab-7" aria-selected="false">${c.name}</a>
                  `;
        })
        .join("");
      html2 += `</div>
              </li>`;
    }
    $("#category2").html(html2);
  });
});
