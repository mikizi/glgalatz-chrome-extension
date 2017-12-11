/**
 * Created by mikiz on 30/11/2017.
 */

//createNotification();
var playingNow,glglz;
initPlayer();

function initPlayer() {
    loadData();
}

function start() {
    if(isPlaying()) {
        glglz.audio.load();
    }
    glglz.audio.volume =  glglz.volume;
    glglz.audio.play();
    glglz.playState="play";
    saveData();
    glglz.interval = setInterval(getPlayerData,4000);
}
function changeNotifications(checked) {
    glglz.showNotifications = checked;
    saveData();
}

function stop() {
    glglz.audio.pause();
    //glglz.audio.pause();
    glglz.playState="stop";
    clearInterval(glglz.interval);
    saveData();
}

function volume(val) {
    glglz.volume = val/100;
    glglz.audio.volume = glglz.volume;
    saveData();
}

function isPlaying() {
    return glglz.playState === "play";
}

function createNotification(res) {
    if(glglz.showNotifications){
        var nextSongName = res.titleNext;
        var author = res.autor;
        var title = res.title;
        var programmeName = res.programmeName;
        var opt = {type: "basic", title: "גלגלצ - "+programmeName, message: ""+(title!="" ? (title+" - "+ author): "" )+ "\n" +"הבא: "+ nextSongName , iconUrl: "icon.png"};
        updateSongName(opt);
        chrome.notifications.create("notificationName", opt, function () {
        });

        //include this line if you want to clear the notification after 5 seconds
        setTimeout(function () {
            chrome.notifications.clear("notificationName", function () { });
        }, 5000);
    }
}

function updateSongName(opt) {
    playingNow = opt.message;
}

function getPlayerData() {
    //var url = 'http://localhost:1337/__sites/reshetTv2016/serviceTest.php';
    var url = 'https://glz.co.il/umbraco/api/player/GetTrackNameFromXml?rootId=1920&channelIndex=-1';
    // var url = 'https://glz.co.il/umbraco/api/player/getplayerdata?rootId=1920';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (glglz.data != xhr.responseText) {
                glglz.data = xhr.responseText;
                createNotification(JSON.parse(glglz.data));
            }
        }
    };
    xhr.send();
}
function saveData() {
    chrome.storage.sync.set({'glglz': glglz}, function() {
        // Notify that we saved.
        //message('Settings saved');
    });
}
function loadData() {
    chrome.storage.sync.get('glglz', function (items) {
        // Notify that we saved.
        glglz = items.hasOwnProperty('glglz') ? items.glglz : {audio:'',data:"",interval:0,playingNow:"",playState:"stop",showNotifications:true,volume:1};
        glglz.audio = new Audio('https://api.bynetcdn.com/Redirector/glz/glglz/ICE-LIVE?tn=&ts=1484122046" type="audio/mpeg');
        if(glglz.volume === undefined){
            glglz.volume = 1;
        }

        if (glglz.playState == "play") {
            glglz.audio.play();
            glglz.audio.volume = glglz.volume;
            glglz.interval = setInterval(getPlayerData, 5000);
        }else{
            glglz.audio.pause();
        }

    });
}

function message(str) {
    var opt = {type: "basic", title: "גלגלצ", message: str, iconUrl: "icon.png"};
    chrome.notifications.create("notificationName", opt, function () {
    });
}