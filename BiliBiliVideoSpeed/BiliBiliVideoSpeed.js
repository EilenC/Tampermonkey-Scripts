// ==UserScript==
// @name         BiliBiliVideoSpeed
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  调整B站视频速度
// @author       Eilen https://github.com/EilenC
// @include      https://*.bilibili.com/*
// @match        https://www.bilibili.com/video/
// @grant        none
// ==/UserScript==

(function() {
    var video = document.getElementsByTagName("video")[0];

    function keyd(e){
        console.log(e.key);
        var speedLabel = document.getElementsByClassName('bilibili-player-video-btn-speed-name')[0];
        if(e.key == "+"){
            video.playbackRate +=0.2;
        }else if(e.key == "-"){
            video.playbackRate -=0.2;
        }
        speedLabel.innerHTML=video.playbackRate+"";
    }
    document.body.removeEventListener('keydown', keyd);
    document.body.addEventListener('keydown', keyd);
    // Your code here...
})();