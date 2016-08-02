// ==UserScript==
// @name         Slither.io Server Lock
// @namespace    http://fishdawg.com/userscript/slither/serverlock
// @version      1.0
// @description  Always stay on the same server in Slither.io. Refresh the page to change servers.
// @author       FishDawg
// @match        http://slither.io/
// @grant        none
// @downloadURL  https://github.com/FishDawg/SlitherioServerLock/raw/master/slitherioserverlock.js
// ==/UserScript==

var lockServerTimerToken;

function lockServer() {
    if (sos.length > 0) {
        // Choose a random server just like how the original game does and remove all the other servers from the list
        sos = [sos[Math.floor(Math.random() * sos.length)]];

        // Remove all clusters from the list (so the game fallback on the list of servers)
        clus = [];

        window.clearInterval(lockServerTimerToken);
        lockServerTimerToken = null;
    }
}

lockServerTimerToken = window.setInterval(lockServer, 1000);

