
(function ($, root) {
    var $scope = $(document.body); // 获取所有的标签

    function renderInfo(data) {
        var html = `<h1 class='song-name'>`+ data.song +`</h1>` +
                    `<h3 class='singer-name'>`+ data.singer +`</h3>` +
                    `<h3 class='album-name'>`+ data.album +`</h3>`
        $scope.find(".song-info").html(html);
    }

    function renderImg(data) {
        var img = new Image();
        img.src = data.image;
        img.onload = function () {
            $scope.find(".song-img img").attr("src", data.image);
            root.blurImg(img, $scope);
        }
    }

    function renderIsLike(isLike) {
        if (isLike) {
            $scope.find(".like-btn").addClass("liked");
        }else {
            $scope.find(".like-btn").removeClass("liked");
        }
    }

    root.render = function (data) {
        renderInfo(data);
        renderImg(data);
        renderIsLike(data.isLike)
    }
}(window.Zepto, window.player || (window.player = {})));





