// ==UserScript==
// @name        AutoScroll2
// @description AutoScroll - 自动向下滚动页面,支持快捷键
// @include     http*
// @version     2020/04/21
// @author      Eilen https://github.com/EilenC
// @grant       none
// @namespace https://greasyfork.org/users/319354
// ==/UserScript==

;(function(document) {
    var enable = false;
    var handler = 0;
    var time = 200;
    var step = 1;
    var keyNum=1;
    function keyd(e){
        console.log(e.key);
        if(e.key == "`"){
            keyNum++;
            if(keyNum%2 == 1){
                enable = !enable;
                clearTimeout(handler);
                if (enable) aScroll();
            }
        }else if(e.key == "ArrowRight"){
            time -= 20;
        }else if(e.key == "ArrowLeft"){
            time += 20;
        }
    }

    document.body.removeEventListener('keydown', keyd);
    document.body.addEventListener('keydown', keyd);

    var aScroll = function() {
        if (enable) document.documentElement.scrollTop += 1;
        handler = setTimeout(aScroll, time);
    };
})(document);