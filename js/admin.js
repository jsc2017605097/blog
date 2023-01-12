// upload image
$(function () {
  $("#uploadImg").change(function () {
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
    };

    $.ajax(settings).done(function (response) {
      response = JSON.parse(response);
      const img = document.getElementById("upload-img");
      img.src = response.data.link;
    });
  });
});
// upload image by ckeditor

