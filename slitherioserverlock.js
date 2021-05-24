// ==UserScript==
// @name         Slither Server Lock
// @namespace    http://fishdawg.com/userscript/slither/serverlock
// @version      2.0
// @description  Always stay on the same server in Slither.io. Refresh the page to change servers.
// @author       FishDawg
// @match        http*://slither.io/
// @grant        GM.setValue
// @grant        GM.getValue
// @compatible   Greasemonkey
// @downloadURL  https://github.com/FishDawg/SlitherioServerLock/raw/master/slitherioserverlock.js
// ==/UserScript==

var lockServerTimerToken;

async function lockServer() {
  if (!bso) {
    // Only use the saved server from the last 6 hours
    var cutoffDate = new Date();
    cutoffDate.setTime(cutoffDate.getTime() - 6*60*60*1000);

    // Try to read the saved server
    var savedDateString = await GM.getValue('Slither Saved Date');
    if (savedDateString) {
      var savedDate = new Date(savedDateString);
      if (!isNaN(savedDate.getTime()) && savedDate >= cutoffDate) {
        var savedServerString = await GM.getValue('Slither Saved Server');
        if (savedServerString) {
          var savedServer = savedServerString;
          var matchingServer = sos.find(s => s.ip === savedServer);
          if (matchingServer) {
            bso = matchingServer;
            console.log('Loaded saved server: ' + bso.ip);
          }
        }
      }
    }
  }

  if (bso) {
    // Keep only the current server
    sos = [bso];

    // Remove all clusters from the list (so the game fallback on the list of servers)
    clus = [];

    var currentDate = new Date();
    GM.setValue('Slither Saved Server', bso.ip);
    GM.setValue('Slither Saved Date', currentDate.toString());

    console.log('Stored saved server: ' + bso.ip);

    window.clearInterval(lockServerTimerToken);
    lockServerTimerToken = null;
  }
}
