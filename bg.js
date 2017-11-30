/**
 * Created by mikiz on 30/11/2017.
 */

//createNotification();
setInterval(getPlayerData,5000);
getPlayerData();
audioNotification();

var playingNow;
var audio;
var data = "";
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

function volume(val) {
    audio.volume = val/100;
}

function isPlaying() {
    return !audio.paused;
}

function createNotification(res) {
    var nextSongName = res.titleNext;
    var author = res.autor;
    var title = res.title;
    var programmeName = res.programmeName;
    var opt = {type: "basic", title: "גלגלצ - "+programmeName, message: ""+(title!="" ? (title+" - "+ author): "" )+ "\n\n" +"הבא: "+ nextSongName , iconUrl: "icon.png"};
    updateSongName(opt);
    chrome.notifications.create("notificationName", opt, function () {
    });

    //include this line if you want to clear the notification after 5 seconds
    setTimeout(function () {
        chrome.notifications.clear("notificationName", function () { });
    }, 5000);
}

function updateSongName(opt){
    playingNow = opt.message;
}

function getPlayerData(){
    //var url = 'http://localhost:1337/__sites/reshetTv2016/serviceTest.php';
    var url = 'https://glz.co.il/umbraco/api/player/GetTrackNameFromXml?rootId=1920&channelIndex=-1';
    // var url = 'https://glz.co.il/umbraco/api/player/getplayerdata?rootId=1920';

    var xhr = new XMLHttpRequest();
    xhr.open("GET",url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if(data != xhr.responseText){
                data = xhr.responseText;
                createNotification(JSON.parse(data));
            }
        }
    };
    xhr.send();
}