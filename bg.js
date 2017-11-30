/**
 * Created by mikiz on 30/11/2017.
 */

//createNotification();
getPlayerData();
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

function createNotification(songName) {
    var opt = {type: "basic", title: "גלגלצ - בגלל המוזיקה", message: songName , iconUrl: "icon.png"};
    chrome.notifications.create("notificationName", opt, function () {
    });

    //include this line if you want to clear the notification after 5 seconds
    setTimeout(function () {
        chrome.notifications.clear("notificationName", function () {
        });
    }, 5000);
}

function getPlayerData(){
    //var url = 'http://localhost:1337/__sites/reshetTv2016/serviceTest.php';
    var url = 'https://glz.co.il/umbraco/api/player/getplayerdata?rootId=1920';
    /*fetch(url ) // Call the fetch function passing the url of the API as a parameter
        .then(function(res) {
           console.log(res);
        })
        .catch(function(er) {
            // This is where you run code if the server returns any errors
            console.log(er);
        });*/

    var xhr = new XMLHttpRequest();
    xhr.open("GET",url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // innerText does not let the attacker inject HTML elements.
            var res = JSON.parse(xhr.responseText);
            var songName = res.liveBroadcast.name;
            console.log( res );
            createNotification(songName);
        }
    };
    xhr.send();
}