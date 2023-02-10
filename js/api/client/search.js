$("#search").keyup(function (e) {
  if (e.keyCode == 13) {
    const keyword = $("#search").val();
    window.location.replace(
      `catagory.html?keyword=${keyword}`
    );
  }
});
