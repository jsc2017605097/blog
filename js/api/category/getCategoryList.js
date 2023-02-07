$(document).ready(function () {
  $("#categoryList").html("Loading...");
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
    if (response.data.length === 0) $("#categoryList").html("No data exist");
    let html = `<table id="categoryList" class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Created At</th>
        <th>Last updated</th>
        <th>Action</td>
      </tr>
    </thead>
    <tbody>`;
    response.data.map((c, index) => {
      html += `<tr>
            <td>${index + 1}</td>
            <td><img src=${
              c.CategoryPhotoUrl
            } height='50px' width='50px' style='margin-right:10px' />${
        c.name
      }</td>
            <td>${
              moment(new Date(c.createdAt)).format("YYYY-MM-DD HH:mm:ss") +
              " " +
              (c.createdBy.nickname || c.createdBy.username)
            }</td>
            <td>${
              moment(c.updatedAt).format("YYYY-MM-DD HH:mm:ss") +
              " " +
              (c.updatedBy.nickname || c.updatedBy.username)
            }</td>
            <td><a href=${CLIENT}/admin/category/detail.html?id=${
        c._id
      }><img src='https://jsc2017605097.github.io/blog/admin/img/action.svg' /></a></td>
        </tr>`;
    });
    html += `</tbody>`;
    $("#categoryList").html(html);
  });
});
