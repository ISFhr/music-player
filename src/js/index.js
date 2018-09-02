var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList;
var ControlManager = root.ControlManager;
var controlManager;
var audioManager = new root.audioManager();
var processor = root.processor;
var playList = root.playList;

function bindTouch() {
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
     // console.log(offset)
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchStart", function () {
          processor.stop(); 
    }).on("touchmove", function (e) {
        // console.log(e)
        var percent = (e.changedTouches[0].clientX - left) / width;
        if (percent < 0 || percent > 1) {
            percent = 0;
        }
        processor.update(percent);

    }).on("touchend", function (e) {
        var percent = (e.changedTouches[0].clientX - left) / width;
        var duration = percent * songList[controlManager.index].duration;
        audioManager.jumpToPlay(duration);
        processor.startProcessor(percent);
        $scope.find(".play-btn").addClass("playing")
    })
}

function bindClick() {
    $scope.on("play:change", function (event, index, flag) {
        root.render(songList[index]);
        audioManager.setAudioSource(songList[index].audio);
        if (audioManager.status == "play" || flag) {
            audioManager.play();
            processor.startProcessor();
        }
        processor.renderAllTime(songList[index].duration);
        processor.update(0);
    })

    $scope.find(".prev-btn").on("click", function () {
        var index = controlManager.prev();
        $scope.trigger("play:change",[index]);
    })

    $scope.find(".next-btn").on("click", function () {
        var index = controlManager.next();
        $scope.trigger("play:change",[index]);
    })

    $scope.find(".play-btn").on("click", function () {
        if (audioManager.status == "pause") {
            audioManager.play();
            $(this).addClass("playing");
            processor.startProcessor();
        }else {
            $(this).removeClass("playing");
            audioManager.pause();
            processor.stop();
        }
    })
    $scope.find(".list-btn").on("click", function () {
        playList.show(controlManager);
    })
}

function getData(url, callback) {
    $.ajax({
        url: url,
        type: "GET",
        success: callback,
        error: function (err) {
            cosole.log(err);
        }
    })
}

function successCall(data) {
    songList = data;
    bindClick();
    bindTouch();
    $scope.trigger("play:change",[0]);    
    controlManager = new ControlManager(data.length);
    playList.renderPlayList(data);
}

getData("./mock/data.json", successCall)





