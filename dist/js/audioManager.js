(function ($, root) {
    var $scope = $(document.body);
    function audioManager() {
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent();
    }

    audioManager.prototype = {
        play : function () {
            this.audio.play(); 
            this.status = "play";
        },
        pause: function () {
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSource : function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay: function (duration) {
            this.audio.currentTime = duration;
            this.play();
        },
        bindEvent: function () {
            $(this.audio).on("ended", function () {
                $scope.find(".next-btn").trigger("click"); 
            })
        }
    }
    root.audioManager = audioManager;
})(window.Zepto, window.player || (window.player = {}))