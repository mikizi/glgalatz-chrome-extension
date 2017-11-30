/**
 * Created by mikiz on 30/11/2017.
 */

createNotification();
audioNotification();

var audio;
function audioNotification() {
    audio = new Audio('https://api.bynetcdn.com/Redirector/glz/glglz/ICE-LIVE?tn=&ts=1484122046" type="audio/mpeg');
    audio.play();
}

function start() {
    audio.play();
}

function stop() {
    audio.pause();
}

function isPlaying() {
    return !audio.paused;
}

function createNotification() {
    var opt = {type: "basic", title: "גלגלצ", message: "בגלל המוזיקה", iconUrl: "icon.png"};
    chrome.notifications.create("notificationName", opt, function () {
    });

    //include this line if you want to clear the notification after 5 seconds
    setTimeout(function () {
        chrome.notifications.clear("notificationName", function () {
        });
    }, 5000);
}