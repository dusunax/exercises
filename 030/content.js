const DRAWER = {
  opened: {
    className: "opened",
    toggleBtn: { textContent: "❌" },
  },
  closed: {
    className: "closed",
    toggleBtn: { textContent: "📂" },
  },
};
const TEMP_LIST = [
  {
    data: "텍스트 1",
    text: "Text-1",
    color: "skyblue",
    index: 0,
  },
  {
    data: "텍스트 2",
    text: "Text-2",
    color: "lightgreen",
    index: 1,
  },
  {
    data: "텍스트 3",
    text: "Text-3",
    color: "lightcoral",
    index: 2,
  },
];

/**
 * Setup
 */
chrome.runtime.sendMessage({ type: "PING" }); // wake up background ping

chrome.storage.local.get("enabled", (result) => {
  const enabled = result.enabled ?? true;
  if (!enabled) {
    portal.classList.add("hidden");
  }
});

/**
 * Content Setup
 */
const portal = document.createElement("div");
portal.id = "ddd-portal";
document.body.appendChild(portal);

let drawerOpen = false;
const defaultDrawer = drawerOpen ? DRAWER.opened : DRAWER.closed;

// 1. Toggle Button
const toggleBtn = document.createElement("div");
toggleBtn.classList.add("toggle-btn");
toggleBtn.textContent = defaultDrawer.toggleBtn.textContent;

// 2. Drawer
const drawer = document.createElement("div");
drawer.id = "drawer";
drawer.classList.add("closed");

const drawerContent = TEMP_LIST;
const drawerUl = document.createElement("ul");
drawerContent.forEach((item) => {
  const li = document.createElement("li");
  li.classList.add("draggable");
  li.draggable = true;
  li.dataset.text = item.data;
  li.textContent = item.text.slice(0, 2);
  li.style.backgroundColor = item.color;
  drawerUl.appendChild(li);
});
drawer.appendChild(drawerUl);

// 3. Toggle Drawer Event
toggleBtn.addEventListener("click", () => {
  drawerOpen = !drawerOpen;
  const currentDrawer = drawerOpen ? DRAWER.opened : DRAWER.closed;

  drawer.classList.toggle("closed");
  toggleBtn.classList.toggle("close");
  toggleBtn.textContent = currentDrawer.toggleBtn.textContent;
});

// 4. Drag Event Binding
function bindDragEvents() {
  drawer.querySelectorAll("li[draggable].draggable").forEach((item) => {
    item.style.cursor = "grab";
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.dataset.text);
    });
  });
}
bindDragEvents();

// 5. Append to body
portal.appendChild(toggleBtn);
portal.appendChild(drawer);

/**
 * Load User Info
 */
const showUserInfo = (user) => {
  const loginInfo = document.createElement("div");
  loginInfo.id = "login-info";
  loginInfo.innerHTML = `
    <img src="${user.photoURL}" alt="User Photo">
    <p>${user.email.split("@")[0]}</p>
  `;
  drawer.prepend(loginInfo);
};
const loadUser = async () => {
  const { user } = await chrome.storage.local.get("user");
  if (user) {
    showUserInfo(user);
  }
};
loadUser();

/**
 * Message Listener
 */
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "TOGGLE_HIDDEN") {
    portal.classList.toggle("hidden");
  }
  if (message.type === "LOGIN_SUCCESS") {
    const user = message.user;
    showUserInfo(user);
  }
  if (message.type === "LOGOUT") {
    const loginInfo = document.getElementById("login-info");
    loginInfo.remove();
  }
});