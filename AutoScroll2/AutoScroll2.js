// ==UserScript==
// @name        AutoScroll2
// @description AutoScroll - 自动向下滚动页面,支持快捷键
// @include     http*
// @version     2023/11/02
// @author      Eilen https://github.com/EilenC
// @grant       none
// @namespace https://greasyfork.org/users/319354
// ==/UserScript==

; (function (document) {
    'use strict';

    function roundToTwoDecimalPlaces(number) {
        return Number(number.toFixed(2));
    }
    // 存储当前通知的定时器
    let notificationTimer = null;
    let notification = document.createElement('div');
    // 显示通知函数
    function showNotification(message, duration) {
        // 如果有，清除之前的定时器
        clearTimeout(notificationTimer);

        // 创建提示元素
        notification.textContent = message;

        // 样式设置
        notification.style.position = 'fixed';
        notification.style.top = '50%';
        notification.style.left = '50%';
        notification.style.transform = 'translate(-50%, -50%)';
        notification.style.background = 'black';
        notification.style.color = 'white';
        notification.style.fontWeight = 'bold';
        notification.style.fontSize = '40px';
        notification.style.padding = '20px';
        notification.style.borderRadius = '10px';

        // 将元素添加到页面
        document.body.appendChild(notification);

        // 设置定时器，在指定的时间后移除通知
        notificationTimer = setTimeout(function () {
            document.body.removeChild(notification);
            notificationTimer = null; // 通知显示完成后清空定时器
        }, duration);
    }
    if (!Date.now) {
        Date.now = function () { return new Date().getTime(); };
    }
    //from https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js
    (function () {
        'use strict';

        var vendors = ['webkit', 'moz'];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            var vp = vendors[i];
            window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
                || window[vp + 'CancelRequestAnimationFrame']);
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
            || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var lastTime = 0;
            window.requestAnimationFrame = function (callback) {
                var now = Date.now();
                var nextTime = Math.max(lastTime + 16, now);
                return setTimeout(function () { callback(lastTime = nextTime); },
                    nextTime - now);
            };
            window.cancelAnimationFrame = clearTimeout;
        }
    }());

    'use strict';

    let keyDownCount = 0;
    let lastKeyDownTime = 0;
    let enable = false;
    let scrollSpeed = 0.55;
    let animationFrameId = 0;
    let tipsTime = 300;
    let handler = 0;
    let time = 200;
    let isEdge = navigator.userAgent.includes('Edg') ? true : false;

    console.log('isEdge:',isEdge);

    function toggleScroll() {
        enable = !enable;
        if (enable) {
            if (isEdge) {
                edgeAutoScroll();
            } else {
                autoScroll();
            }
            showNotification('AutoScroll:Open', tipsTime);
        } else {
            if (isEdge){
                cancelAnimationFrame(animationFrameId);
            }else{
                clearTimeout(handler);
            }
            showNotification('AutoScroll:Close', tipsTime);
        };
    }

    function keydownHandler(e) {
        console.log(e.key);
        let currentTime = new Date().getTime();
        switch (e.key) {
            case "`":
                if (currentTime - lastKeyDownTime < 300) {
                    keyDownCount++;
                } else {
                    keyDownCount = 1;
                }

                lastKeyDownTime = currentTime;

                if (keyDownCount === 2) {
                    toggleScroll();
                    keyDownCount = 0;
                }
                break;
            case "ArrowRight":
                if (isEdge) {
                    scrollSpeed = roundToTwoDecimalPlaces(scrollSpeed += 0.02);
                    showNotification('Speed:' + scrollSpeed, tipsTime);
                }else{
                    time -= 20;
                }
                break;
            case "ArrowLeft":
                if(isEdge) {
                    if (scrollSpeed - 0.02 > 0) {
                        scrollSpeed -= 0.02
                    }
                    scrollSpeed = roundToTwoDecimalPlaces(scrollSpeed);
                    showNotification('Speed:' + scrollSpeed, tipsTime);
                }else{
                    time += 20;
                }
                break;
        }
    }
    function edgeAutoScroll() {
        console.log("edgeAutoScroll: " + document.documentElement.scrollTop);
        console.log(window.scrollY, window.pageYOffset, document.documentElement.scrollTop);
        document.documentElement.scrollTop += scrollSpeed;
        animationFrameId = requestAnimationFrame(edgeAutoScroll);
    }
    function autoScroll() {
        console.log("autoScroll: " + document.documentElement.scrollTop);
        console.log(window.scrollY, window.pageYOffset, document.documentElement.scrollTop);
        document.documentElement.scrollTop += 2;
        handler = setTimeout(autoScroll, time);
    }

    // 监听键盘事件
    document.body.removeEventListener('keydown', keydownHandler);
    document.body.addEventListener('keydown', keydownHandler);
})(document);