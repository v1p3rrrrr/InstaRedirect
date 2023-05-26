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
  
    // Retrieve the current selected option from storage and update the UI
    chrome.storage.sync.get("redirectOption", function(data) {
      var redirectOption = data.redirectOption;
      if (!redirectOption) {
        redirectOption = null; // Set "disabled" as the default option
        chrome.storage.sync.set({ redirectOption: redirectOption });
      }
      updateActiveOption(redirectOption);
    });
  
    function setActiveOption(option) {
      chrome.storage.sync.set({ redirectOption: option }, function() {
        updateActiveOption(option);
        // Send the selected option to background.js
        chrome.runtime.sendMessage({ option: option });
      });
    }
  
    function updateActiveOption(redirectOption) {
      // Remove the "selected" class from all buttons
      disabledButton.classList.remove("selected");
      redirectDumporButton.classList.remove("selected");
      redirectPicukiButton.classList.remove("selected");
  
      // Set the "selected" class to the corresponding button based on the redirectOption
      if (redirectOption === null) {
        disabledButton.classList.add("selected");
      } else if (redirectOption === "dumpor") {
        redirectDumporButton.classList.add("selected");
      } else if (redirectOption === "picuki") {
        redirectPicukiButton.classList.add("selected");
      }
    }
  });
  