(function ($, root) {
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime;
    var lastPercent = 0;
    function formatTime(duration) {
        duration = Math.round(duration);
        var minute = Math.floor(duration / 60);
        var second = duration - minute * 60;
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" +  second;
        }
        return minute + ":" + second;
    }

    function renderAllTime(duration) {
        curDuration = duration;
        lastPercent = 0;
        var allTime = formatTime(duration);
        $scope.find(".all-time").text(allTime);
    }
    
    function startProcessor(percentage) {
        lastPercent = percentage == undefined ? lastPercent : percentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime(); 
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime - startTime) / (curDuration * 1000) ;
            if (percent < 1) {
                frameId = requestAnimationFrame(frame);
                update(percent);
            }else {
                cancelAnimationFrame(frameId);
            }
            // console.log(percent)
        }
        frame();
    }
    function stop() {
        var stopTime = new Date().getTime();
        cancelAnimationFrame(frameId);
        lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000);
    }

    function update(percent) {
        var curTime = percent * curDuration;
        var time = formatTime(curTime);
        $scope.find(".current-time").text(time);
        process(percent);
    }

    function process(percent) {
        var percnetage = (percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform: "translateX(" + percnetage + ")"
        })
    }

    root.processor = {
        update,
        renderAllTime,
        startProcessor,
        stop
    }
}(window.Zepto, window.player || (window.player = {})))