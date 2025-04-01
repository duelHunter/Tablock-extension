chrome.runtime.onInstalled.addListener(() => {
    lockWhatsAppTabs();
  });
  
  chrome.runtime.onStartup.addListener(() => {
    lockWhatsAppTabs();
  });

  chrome.tabs.onActivated.addListener(() => {
    lockWhatsAppTabs();
  });
  
  function lockWhatsAppTabs() {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url && tab.url.includes("https://web.whatsapp.com")) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
          });
        }
      });
    });
  }
  