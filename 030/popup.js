/**
 * Utils
 */
const showUserInfo = (user) => {
  const userInfo = document.getElementById("user-info");
  userInfo.querySelector("#user-email").innerHTML = user.email;
  userInfo.querySelector("#user-provider-id").innerHTML = user.providerId;
  userInfo.querySelector("#user-user-id").innerHTML = user.id;
  userInfo.querySelector("#user-photo").src = user.photoURL;
  userInfo.classList.remove("hidden");
  toggleLoginBtn();
};
const toggleLoginBtn = () => {
  document.getElementById("login-btn").classList.toggle("hidden");
  document.getElementById("logout-btn").classList.toggle("hidden");
};
const toggleUserUI = () => {
  const userInfo = document.getElementById("user-info");
  userInfo.classList.toggle("hidden");
  toggleLoginBtn();
};

/**
 * Initialization
 */
chrome.storage.local.get("enabled", async (result) => {
  const enabled = result.enabled ?? true;
  if (!enabled) {
    const enableBtn = document.getElementById("toggle-enable-btn");
    enableBtn.textContent = "Disabled";
  }
});

chrome.storage.local.get("user", (result) => {
  const user = result.user;
  if (user) {
    showUserInfo(user);
  }
});

document.querySelectorAll(".draggable").forEach((el) => {
  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", el.dataset.text);
  });
});

/**
 * ✨ Button Event Listeners
 */
// 👉 Draw toggle
document
  .getElementById("toggle-enable-btn")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    await chrome.tabs.sendMessage(tab.id, {
      type: "TOGGLE_HIDDEN",
    });

    const { enabled } = await chrome.storage.local.get("enabled");
    const newEnabled = !enabled;
    const enableBtn = document.getElementById("toggle-enable-btn");
    enableBtn.textContent = newEnabled ? "Enabled" : "Disabled";
    chrome.storage.local.set({ enabled: newEnabled });
  });

// 👉 Login
document.getElementById("login-btn").addEventListener("click", () => {
  window.open(
    "https://dusunax.github.io/exercises/030/login.html",
    "Login",
    "width=500,height=600"
  );

  window.addEventListener("message", async (event) => {
    if (event.data.type === "LOGIN_SUCCESS") {
      const user = event.data.user;

      chrome.runtime.sendMessage({
        type: "LOGIN_SUCCESS",
        user,
      });

      chrome.storage.local.set({ user });
      showUserInfo(user);
      toggleLoginBtn();
    }
  });
});

// 👉 Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "PING" }); // wake up background ping
  chrome.runtime.sendMessage({
    type: "LOGOUT",
  });
  toggleUserUI();
  chrome.storage.local.set({ user: null });
});
