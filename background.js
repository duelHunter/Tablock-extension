chrome.runtime.onInstalled.addListener(() => {
    lockWhatsAppTabs();
  });
  
  chrome.runtime.onStartup.addListener(() => {
    lockWhatsAppTabs();
  });

  let lastActiveTabUrl = "";
  let lockTimeout;
  
  chrome.tabs.onActivated.addListener((activeInfo) => {
      chrome.tabs.get(activeInfo.tabId, (tab) => {
          if (chrome.runtime.lastError || !tab || !tab.url) return;
  
          if (lastActiveTabUrl.includes("https://web.whatsapp.com") && !tab.url.includes("https://web.whatsapp.com")) {
              // User left WhatsApp, start lock timer
              clearTimeout(lockTimeout);
              lockTimeout = setTimeout(lockWhatsAppTabs, 2 * 60 * 1000); 
          }
  
          // Update last active tab URL
          lastActiveTabUrl = tab.url;
      });
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
  