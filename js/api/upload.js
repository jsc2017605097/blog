// upload image
$(function () {
  $("#uploadImg").change(function () {
    document.getElementById("upload-img").src =
      "../../../admin/img/loading.gif";
    document.getElementById("upload-img").style.height = "250px";
    var fileInput = this;
    var form = new FormData();
    form.append("image", fileInput.files[0], fileInput.files[0].name);

    var settings = {
      url: "https://api.imgur.com/3/image",
      method: "POST",
      timeout: 0,
      headers: {
        Authorization: "Client-ID 6db47bd7029562d",
        Cookie: "IMGURSESSION=cec36acd7b728d8560f4d9658033e47f; _nc=1",
      },
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
      error: function (e) {
        console.log(JSON.parse(e.responseText).data.error);
        window.alert("Cannot upload image,please contact my boss(***405)");
      },
    };

    $.ajax(settings).done(function (response) {
      response = JSON.parse(response);
      const img = document.getElementById("upload-img");
      img.src = response.data.link;
      img.style.height = "250px";
    });
  });
});
