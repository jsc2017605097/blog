$(document).ready(function () {
  generateBlogList(0);
});

function generateBlogList(offset, selectCategory, keyword) {
  let categoryId = $("#categoryId option:selected").val();
  if (categoryId === "null") categoryId = null;
  let endpoint = `${ENDPOINT}/blog?`;
  if (keyword) endpoint += `keyword=${keyword}&&`;
  if (categoryId) endpoint += `categoryId=${categoryId}&&`;

  $("#categoryList").html("Loading...");
  var settings = {
    url: `${endpoint}offset=${offset}&&limit=${LIMIT}`,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
    },
    error: function (e) {
      if (e.responseJSON.statusCode === 401) {
        window.location.replace(`${CLIENT}/login/index.html`);
      } else {
        window.alert(e.responseJSON.message);
      }
    },
  };
  !selectCategory && getCategory(null);

  $.ajax(settings).done(function (response) {
    if (response.data.total === 0) $("#blogList").html("No data exist");
    let html = `<div><b>Total blog: ${response.data.total}</b></div><table id="blogList" class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>title</th>
          <th>Created at</th>
          <th>Last updated </th>
          <th>Category</th>
          <th>Action</td>
        </tr>
      </thead>
      <tbody>`;
    response.data.result.map((blog, index) => {
      html += `<tr>
              <td>${index + offset + 1}</td>
              <td><div style="display:flex;justify-items:center"><img src=${
                blog.blogPhotoUrl
              } style='margin-right:10px' width='50px' height='50px' />${
        blog.title
      }</div></td>
              <td>${
                moment(blog.createdAt).format("YYYY-MM-DD HH:mm:ss") +
                " " +
                (blog.createdBy.nickname || blog.createdBy.username)
              }</td>
              <td>${
                moment(blog.updatedAt).format("YYYY-MM-DD HH:mm:ss") +
                " " +
                (blog.updatedBy.nickname || blog.updatedBy.username)
              }</td>
            <td><div style="display:flex;justify-items:center"><img src=${
              blog.categoryId.CategoryPhotoUrl
            } style='margin-right:10px' width='50px' height='50px' />${
        blog.categoryId.name
      }</div></td>
              <td><a href=${CLIENT}/admin/blog/detail.html?id=${
        blog._id
      }><img src='https://jsc2017605097.github.io/blog/admin/img/action.svg' /></a></td>
          </tr>`;
    });
    html += `</tbody>`;
    $("#blogList").html(html);
    const pagination = Math.ceil(response.data.total / LIMIT);
    let paginationHTML = `  <nav>
    <ul class="pagination">
      `;
    for (let i = 0; i < pagination; i++) {
      paginationHTML += `<li class="page-item ${
        offset === i * LIMIT && "active"
      }"><a onClick="generateBlogList(${
        i * LIMIT
      })" class="page-link" href="#">${i + 1}</a></li>
      `;
    }
    paginationHTML += `
      </ul>
      </nav>`;
    $("#pagination").html(paginationHTML);
  });
}

function getCategory(categoryCurrent) {
  $("#categoryId").html("<option>Loading...</option>");
  var settings = {
    url: `${ENDPOINT}/category/`,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
    },
    error: function (e) {
      if (e.responseJSON.statusCode === 401) {
        window.location.replace(`${CLIENT}/login/index.html`);
      } else {
        window.alert(e.responseJSON.message);
      }
    },
  };

  $.ajax(settings).done(function (response) {
    let category = "<option value=null>All</option>";
    response.data.forEach((element) => {
      if (element._id === categoryCurrent)
        category += `<option selected value=${element._id} data-img-src=${element.CategoryPhotoUrl}>${element.name}</option>`;
      else
        category += `<option value=${element._id} data-img-src=${element.CategoryPhotoUrl}>${element.name}</option>`;
    });
    $("#categoryId").html(category);
    const categoryUrl = $("#categoryId option:selected").attr("data-img-src");
    const categoryImg = `<img src=${categoryUrl} width='50px' />`;
    $("#categoryImg").html(categoryImg);
  });
}

$(function () {
  $("#categoryId").change(function () {
    generateBlogList(0, "selectCategory", $("#searchBlog").val());
  });
});

$("#searchBlog").keyup(function (e) {
  if (e.keyCode == 13) {
    console.log($("#searchBlog").val());
    generateBlogList(0, "select", $("#searchBlog").val());
  }
});
