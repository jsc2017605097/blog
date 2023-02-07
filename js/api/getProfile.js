// constant
const ENDPOINT = "https://dongtrunghathaocom-production.up.railway.app";
// const ENDPOINT = "http://10.2.22.124:3000";
const CLIENT = location.origin;
const TOKEN_KEY = "token";
const LIMIT = 10;

let USERNAME = null;
let NICKNAME = null;
// get profile
$(document).ready(function () {
  var settings = {
    url: `${ENDPOINT}/auth`,
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
    const admin = response.data._doc.nickname || response.data._doc.username;
    const username = response.data._doc.username;
    $("#admin").html(admin);
    $("#username").val(username);
    USERNAME = username;
    NICKNAME = admin;
    $("#nickname").val(NICKNAME);

    // $("#username").val(pass);
  });
});

$(function () {
  $("#openCategory").click(function () {
    window.location.replace(`${CLIENT}/admin/category/list.html`);
  });
  $("#openBlog").click(function () {
    window.location.replace(`${CLIENT}/admin/blog/list.html`);
  });
  $("#openChangePassword").click(function () {
    window.location.replace(`${CLIENT}/admin/account/change-password.html`);
  });
  $("#openMyprofile").click(function () {
    window.location.replace(`${CLIENT}/admin/account/myprofile.html`);
  });
  $("#logout").click(function () {
    localStorage.removeItem(TOKEN_KEY);
    window.location.replace(`${CLIENT}/admin/account/myprofile.html`);
  });
});
