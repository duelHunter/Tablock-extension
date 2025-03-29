document.getElementById("saveBtn").addEventListener("click", () => {
  const password = document.getElementById("password").value;
  if (password) {
    chrome.storage.local.set({ tablock_password: password }, () => {
      alert("Password saved!");
    });
  }
});
