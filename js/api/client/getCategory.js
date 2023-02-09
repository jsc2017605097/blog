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
        const data2 = response.data.map(c => {
            return `<a class="dropdown-item" href="https://jsc2017605097.github.io/blog/contact.html?categoryId=${c._id}">${c.name}</a>`;
        })
        $("#nav-category").html(data2);

        const data = response.data.map(category => {
            return `
                <li class="nav-item">
                    <a class="nav-link" id="tab1" data-toggle="tab" href="#world-tab-1" role="tab" aria-controls="world-tab-1" aria-selected="true">${category.name}</a>
                </li>
            `
        })
        let html = `<li class="title">Bài đăng mới</li>`;
        html += `<li class="nav-item">
        <a class="nav-link active" id="tab1" data-toggle="tab" href="#world-tab-1" role="tab" aria-controls="world-tab-1" aria-selected="true">All</a>
        </li>`;
        html += data.join("");
        html += `
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">More</a>
            <div class="dropdown-menu">
                <a class="nav-link" id="tab7" data-toggle="tab" href="#world-tab-7" role="tab" aria-controls="world-tab-7" aria-selected="false">Sports</a>
                <a class="nav-link" id="tab8" data-toggle="tab" href="#world-tab-8" role="tab" aria-controls="world-tab-8" aria-selected="false">Politices</a>
                <a class="nav-link" id="tab9" data-toggle="tab" href="#world-tab-9" role="tab" aria-controls="world-tab-9" aria-selected="false">Features</a>
            </div>
        </li>`;
        $("#category").html(html);
        let html2 = `<li class="title">Bài đăng quan tâm</li>`;
        html2 += data.join("");
        html2 += `
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">More</a>
            <div class="dropdown-menu">
                <a class="nav-link" id="tab7" data-toggle="tab" href="#world-tab-7" role="tab" aria-controls="world-tab-7" aria-selected="false">Sports</a>
                <a class="nav-link" id="tab8" data-toggle="tab" href="#world-tab-8" role="tab" aria-controls="world-tab-8" aria-selected="false">Politices</a>
                <a class="nav-link" id="tab9" data-toggle="tab" href="#world-tab-9" role="tab" aria-controls="world-tab-9" aria-selected="false">Features</a>
            </div>
        </li>`;
        $("#category2").html(html2);

    });
});
