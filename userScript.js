// ==UserScript==
// @name         QuilBot Premium
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Note this is just for educational purpose
// @match        https://quillbot.com/*
// @grant        none
// @author       Xettri Aleen

// @run-at document-idle
// ==/UserScript==



(function() {
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var url = arguments[1];
        // Check if the URL contains "get-account-details"
        if (url && url.includes("get-account-details")) {
            var self = this;
            this.addEventListener('load', function() {
                // Intercept the response
                var originalResponse = self.responseText;
                var modifiedResponse = originalResponse.replace(`"accepted_premium_modes_tnc":false`, `"accepted_premium_modes_tnc":true`);
                modifiedResponse = modifiedResponse.replace(`"premium":false`, `"premium":true`);
                // Override the response with the modified content
                Object.defineProperty(self, 'responseText', {
                    writable: true,
                    value: modifiedResponse
                });

            });
        }
        origOpen.apply(this, arguments);
    };
})();
