let lockTimeout;

chrome.storage.local.get("tablock_password", (data) => {
  const secretKey = "yourSecretKey123";
  const encryptedPassword = data.tablock_password;
  if (!encryptedPassword) return;

  // Decrypt the password using AES
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

  function tabLock() {
    if (document.getElementById("tablock_iframe")) return;


    // Create an iframe for password input (isolated from main page)
    const iframe = document.createElement("iframe");
    iframe.id = "tablock_iframe";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.zIndex = "9999";
    iframe.style.border = "none";
    iframe.style.backgroundColor = "rgb(0, 0, 0)";
    iframe.style.display = "block";
    iframe.style.pointerEvents = "all"; // Block interaction with page underneath

    // Insert the iframe into the body
    document.body.appendChild(iframe);

    // Inside iframe, create password input and UI elements
    const doc = iframe.contentWindow.document;
    doc.body.style.margin = 0;
    doc.body.style.fontFamily = "Arial, sans-serif";
    doc.body.style.display = "flex";
    doc.body.style.alignItems = "center";
    doc.body.style.justifyContent = "center";
    doc.body.style.height = "100vh";
    doc.body.style.color = "#fff";
    doc.body.style.textAlign = "center";

    doc.body.innerHTML = `
      <div>
        <h2>🔒 Enter Password to Unlock</h2>
        <input type="password" id="unlockPassword" placeholder="Password" style="
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: none;
          margin-top: 10px;
          outline: none;
          width: 250px;
        " />
        <br/><br/>
        <button id="unlockBtn" style="
          padding: 8px 16px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          background-color: #4CAF50;
          color: white;
        ">Unlock</button>
      </div>
    `;

    doc.getElementById("unlockBtn").addEventListener("click", () => {
      const input = doc.getElementById("unlockPassword").value;
      if (input === decryptedPassword) {
        iframe.remove(); // Remove iframe after success
      } else {
        doc.body.innerHTML = `<h2 style='color: red;'>🔒 Incorrect Password</h2>`;
      }
    });

    // Disable right-click (inspect block)
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    // Disable keyboard shortcuts for inspect tool (F12, Ctrl+Shift+I)
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C"))
      ) {
        e.preventDefault();
      }
    });

    // Disable keyboard shortcuts for inspect tool (F12, Ctrl+Shift+I)
    iframe.contentWindow.document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C"))
      ) {
        e.preventDefault();
      }
    });
  }

  // Detect when the user switches tabs
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      // Start 3-minute timer
      lockTimeout = setTimeout(tabLock, 1 * 60 * 1000);
    } else {
      // Cancel lock if the user returns
      clearTimeout(lockTimeout);
    }
  });
});
