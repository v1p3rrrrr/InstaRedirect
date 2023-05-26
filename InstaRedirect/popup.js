document.addEventListener("DOMContentLoaded", function() {
    var disabledButton = document.getElementById("disabled");
    var redirectDumporButton = document.getElementById("redirectDumpor");
    var redirectPicukiButton = document.getElementById("redirectPicuki");
  
    disabledButton.addEventListener("click", function() {
      setActiveOption(null);
    });
  
    redirectDumporButton.addEventListener("click", function() {
      setActiveOption("dumpor");
    });
  
    redirectPicukiButton.addEventListener("click", function() {
      setActiveOption("picuki");
    });
  
    chrome.storage.sync.get("redirectOption", function(data) {
      var redirectOption = data.redirectOption;
      if (!redirectOption) {
        redirectOption = null; 
        chrome.storage.sync.set({ redirectOption: redirectOption });
      }
      updateActiveOption(redirectOption);
    });
  
    function setActiveOption(option) {
      chrome.storage.sync.set({ redirectOption: option }, function() {
        updateActiveOption(option);
        chrome.runtime.sendMessage({ option: option });
      });
    }
  
    function updateActiveOption(redirectOption) {
      disabledButton.classList.remove("selected");
      redirectDumporButton.classList.remove("selected");
      redirectPicukiButton.classList.remove("selected");
  
      if (redirectOption === null) {
        disabledButton.classList.add("selected");
      } else if (redirectOption === "dumpor") {
        redirectDumporButton.classList.add("selected");
      } else if (redirectOption === "picuki") {
        redirectPicukiButton.classList.add("selected");
      }
    }
  });
  
