document.addEventListener("DOMContentLoaded", function() {
    
  var rootElement = document.querySelector('body');
  function detectTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        rootElement.classList.add('dark-theme');
    } else {
        rootElement.classList.add('light-theme');
    }
  }

  detectTheme();

    var disabledButton = document.getElementById("disabled");
    disabledButton.innerText = chrome.i18n.getMessage("disabled_text");

    var redirectDumporButton = document.getElementById("redirectDumpor");
    redirectDumporButton.innerText = chrome.i18n.getMessage("redirect_text") + " dumpor.com";

    var redirectPicukiButton = document.getElementById("redirectPicuki");
    redirectPicukiButton.innerText = chrome.i18n.getMessage("redirect_text") + " picuki.com";
  
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
  