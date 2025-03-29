chrome.storage.local.get("tablock_password", (data) => {
    const savedPassword = data.tablock_password;
    if (!savedPassword) return;
  
    const input = prompt("Enter password to unlock WhatsApp Web:");
    if (input !== savedPassword) {
      document.body.innerHTML = "<h2 style='text-align:center; margin-top:20%;'>🔒 Tab is Locked</h2>";
    }
  });
  