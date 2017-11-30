/**
 * Created by mikiz on 30/11/2017.
 */
document.addEventListener('DOMContentLoaded', function () {
    var bgp = chrome.extension.getBackgroundPage();
    var playBtn = document.getElementById('play');
    var stopBtn = document.getElementById('pause');
    showButtons(bgp, playBtn, stopBtn);

    playBtn.addEventListener('click', function () {
        bgp.start();
        showButtons(bgp, playBtn, stopBtn);
    }, false);


    stopBtn.addEventListener('click', function () {
        var bgp = chrome.extension.getBackgroundPage();
        bgp.stop();
        showButtons(bgp, playBtn, stopBtn);
    }, false);
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