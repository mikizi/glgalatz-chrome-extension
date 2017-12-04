/**
 * Created by mikiz on 30/11/2017.
 */

document.addEventListener('DOMContentLoaded', function () {
    var bgp = chrome.extension.getBackgroundPage();
    var playBtn = document.getElementById('play');
    var stopBtn = document.getElementById('pause');
    var playingNow = document.getElementById('playingNow');
    var volume = document.getElementById('volumeBar');
    var settings = document.getElementById('settings');
    var notifications = document.getElementById('notifications');
    showButtons(bgp, playBtn, stopBtn);

    playBtn.addEventListener('click', function () {
        bgp.start();
        showButtons(bgp, playBtn, stopBtn);
    }, false);

    notifications.addEventListener('change', function () {
        bgp.changeNotifications(this.checked);
    }, false);

    settings.addEventListener('click', toggleSettings, false);

    volume.addEventListener("input", function () {
        bgp.volume(this.value);
        showButtons(bgp, playBtn, stopBtn);
    }, false);

    stopBtn.addEventListener('click', function () {
        var bgp = chrome.extension.getBackgroundPage();
        bgp.stop();
        showButtons(bgp, playBtn, stopBtn);
    }, false);

    if(bgp.isPlaying() &&  bgp.playingNow && localStorage.getItem("playingNow")){
        debugger;
        playingNow.innerText = bgp.playingNow;
    }else{
        playingNow.innerText = '';
    }

    setInterval(function(){
        if(bgp.isPlaying() && bgp.playingNow && playingNow.innerText != bgp.playingNow) {
            if(playingNow.innerText){
                playingNow.classList.remove('animatedText');
            }else{
                localStorage.setItem("playingNow", bgp.playingNow);
            }

            setTimeout(function () {
                playingNow.classList.add('animatedText');
                playingNow.innerText = bgp.playingNow;
            },50);
        }
    },5000);
    volume.value = bgp.glglz.volume*100;
    notifications.checked = bgp.glglz.showNotifications;
}, false);

function showButtons(bgp, playBtn, stopBtn) {
    if (bgp.isPlaying()) {
        playBtn.classList.add("hide");
        stopBtn.classList.remove("hide");

    } else {
        stopBtn.classList.add("hide");
        playBtn.classList.remove("hide");
    }
}
function toggleSettings() {
    var settingsView = document.getElementById("settingsView");
    settingsView.classList.toggle("show");
    // var main = document.getElementById("main");
    // main.classList.toggle("show");
}

