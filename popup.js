document.getElementById("saveBtn").addEventListener("click", () => {
  const secretKey = "yourSecretKey123"; 
  const password = document.getElementById("password").value;

  if (password) {
    // Encrypt the password using AES
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

    chrome.storage.local.set({ tablock_password: encryptedPassword }, () => {
      alert("Password saved securely!");
    });
  }
});
