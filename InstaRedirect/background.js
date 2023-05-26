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

                var prefixRegex = /^(?:https?:\/\/)?(?:www\.)?/i;
                var cleanedUrl = url.replace(prefixRegex, "");

                var newUrl = cleanedUrl.replace("instagram.com", redirectUrl);
                console.log (newUrl);
                /*chrome.tabs.update(details.tabId, {
                    url: newUrl
                });*/
            }
        }
    });
});