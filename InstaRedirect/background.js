chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.option !== undefined) {
        var redirectOption = message.option;
        chrome.storage.sync.set({redirectOption: redirectOption}, function() {
            //заглушка
        });
    }
});

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    chrome.storage.sync.get("redirectOption", function(data) {
        var redirectOption = data.redirectOption;
        var url = details.url;
        if (url.includes("instagram.com")) {
            if (redirectOption !== null) {
                var redirectUrl = "";
                if (redirectOption === "dumpor") {
                    redirectUrl = "https://dumpor.com/v";
                } else if (redirectOption === "picuki") {
                    redirectUrl = "https://picuki.com/profile";
                }
                var profileRegex = /instagram\.com\/[^\/?&]+/i;
                var match = profileRegex.exec(url);
                if (match !== null) {
                    var profileUrl = match[0];
                    var newUrl = profileUrl.replace("instagram.com", redirectUrl);
                    chrome.tabs.update(details.tabId, {url: newUrl});
                }
            }
        }
    });
});
