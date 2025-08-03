chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "PING") {
    console.log("🔥 Background script is awake!");
  }

  if (message.type === "LOGIN_SUCCESS") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;

      chrome.tabs.sendMessage(
        tab.id,
        {
          type: "LOGIN_SUCCESS",
          user: message.user,
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(
              "SendMessage Error:",
              chrome.runtime.lastError.message
            );
          }
        }
      );
    });
  }

  if (message.type === "LOGOUT") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;

      chrome.tabs.sendMessage(
        tab.id,
        {
          type: "LOGOUT",
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(
              "SendMessage Error:",
              chrome.runtime.lastError.message
            );
          }
        }
      );
    });
  }
});
