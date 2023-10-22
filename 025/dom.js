// DOM elements
const CHAT = document.querySelector("#chat");
const MSG = document.querySelector("#msg");

const search = window.location.search;
const searchParams = new URLSearchParams(search);
const currentFriendType = searchParams.get("friend") || "nice";

function addNewMsg() {
  if (!MSG.value) return;

  const template = `
      <li class="comment pure-g w-full">
        <div class="bg-accent-${currentFriendType} px-4 py-2 rounded-lg ml-auto">
          ${MSG.value}
        </div>
      </li>`;

  setTimeout(() => {
    MSG.value = "";
  }, 0);
  CHAT.insertAdjacentHTML("beforeend", template);
  CHAT.scrollTop = CHAT.scrollHeight;
}
