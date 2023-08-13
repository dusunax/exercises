import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// 테스트 db: ~9/12 이후 삭제
const firebaseConfig = {
  apiKey: "AIzaSyBmozSmYHUYFfS8Vio1n-l0Twqux90lLpE",
  authDomain: "group-230826.firebaseapp.com",
  projectId: "group-230826",
  storageBucket: "group-230826.appspot.com",
  messagingSenderId: "478706830624",
  appId: "1:478706830624:web:a72720b7b0569b56441b45",
  measurementId: "G-ZYBYSGJREY",
};

const QUERY_COLLECTION_ID = getIdFromString("id");

// Firebase 초기화
// Firestore 인스턴스 생성
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

let groupData = await getGroup(QUERY_COLLECTION_ID);
initialize(groupData);

// -------------------------------------------------------
/** dom elements
 * - 모임 정보
 * - 버튼
 * - 인풋
 * - 버튼
 * - 모달
 */

// 모임 정보
const MEETUP_ID = document.getElementById("meetup-id");
MEETUP_ID.innerText = QUERY_COLLECTION_ID;

// ASIDE
const GEUEST_ASIDE = document.getElementById("guest-aside");
const MESSAGE_ASIDE = document.getElementById("message-aside");

// 버튼
const SAVE_BUTTON = document.getElementById("save-button");
const OPEN_RESULT = document.getElementById("show-result-button");
const OPEN_RATE = document.getElementById("show-rate-button");

// 모달
const RESULT_MODAL = document.getElementById("result-modal");
const RATE_MODAL = document.getElementById("rate-modal");

/** 초기화 initialize
 * 1. 그룹 패칭
 * 2. 메시지 리스트 초기화
 * 3. 참여자 리스트 초기화
 * 4. 모임 정보 초기화
 */
async function initialize(group) {
  try {
    initializeMessagesData(group);
    initializeMeetupData(group);
    initializeGuestsData(group);
    document.title = group.title;
  } catch (e) {
    window.location = "/024/error.html";
  }
}

async function getGroup(collectionId) {
  const col = collection(db, "groups");
  const snapshot = await getDocs(col);
  const groups = snapshot.docs.map((doc) => doc.data());

  return groups.find((e) => e.id === collectionId);
}

async function initializeMessagesData(group) {
  if (!group) return console.log("group not found");

  const MESSAGE_COUNT = document.getElementById("message-count");
  MESSAGE_COUNT.appendChild(document.createTextNode(group.count?.message));

  const MESSAGE_LIST = document.getElementById("message-list");
  MESSAGE_LIST.innerHTML = "";
  const list = group.messages;

  list?.forEach((message) => {
    setMessageList(message, MESSAGE_LIST);
  });
}

async function initializeGuestsData(group) {
  const GUEST_LIST = document.getElementById("guest-list");
  GUEST_LIST.innerHTML = "";
  const list = group.guests;

  list?.forEach((guest) => {
    setGuestList(guest, GUEST_LIST);
  });
}

async function initializeMeetupData(group) {
  const MEETUP = document.getElementById("meetup-info");
  const { map, web } = group.link;

  MEETUP.parentElement.querySelector(".title").innerHTML = group.title;
  MEETUP.querySelector(".description").innerHTML = group.description;
  MEETUP.querySelector(".place").innerHTML = group.place;

  const link = MEETUP.querySelector(".link-web");
  link.innerHTML = web;
  link.setAttribute("href", web);

  MEETUP.querySelector(".link-map").addEventListener("click", () => {
    window.open(map, "_blank");
  });
}

// ----------------------------------------------------------------
// 이벤트 구독
SAVE_BUTTON.addEventListener("click", () => {
  const nameInput = MESSAGE_ASIDE.querySelector("input[name='nickname']");
  const messageInput = MESSAGE_ASIDE.querySelector("input[name='message']");

  const MESSAGE_LIST = document.getElementById("message-list");
  const MESSAGE_COUNT = document.getElementById("message-count");

  if (nameInput.value && messageInput.value) {
    const newValues = { name: nameInput.value, message: messageInput.value };
    createMessage(newValues);
    setMessageList(newValues, MESSAGE_LIST);

    messageInput.value = "";
    nameInput.value = "익명";

    const newCount = groupData.count.message + 1;
    MESSAGE_COUNT.textContent = newCount;
    groupData.count.message = newCount;
  }
});

function setMessageList(message, listElement) {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  const textSpan = document.createElement("span");

  const deleteButton = document.createElement("i");
  deleteButton.classList.add("fas");
  deleteButton.classList.add("fa-trash");
  deleteButton.classList.add("delete");

  deleteButton.addEventListener("click", () => {
    deleteMessage(message.id);
    li.remove();

    const MESSAGE_COUNT = document.getElementById("message-count");
    const newCount =
      groupData.count.message - 1 > 0 ? groupData.count.message - 1 : 0;
    MESSAGE_COUNT.textContent = newCount;
    groupData.count.message = newCount;
  });

  li.classList.add("message-item");
  nameSpan.classList.add("name");
  textSpan.classList.add("text");

  li.dataset.id = message.id;
  nameSpan.textContent = message.name;
  textSpan.textContent = message.message;

  li.appendChild(nameSpan);
  li.appendChild(textSpan);
  li.appendChild(deleteButton);
  listElement.prepend(li);
}

async function setGuestList(guest, listElement) {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  const prizeLeftSpan = document.createElement("span");
  const prizeRightSpan = document.createElement("span");

  li.classList.add("guest-item");

  const PRIZE = ["", "🎁", "🍰", "🧃"];
  nameSpan.textContent = guest.filteredName;
  prizeLeftSpan.textContent = PRIZE[guest.prize];
  prizeRightSpan.textContent = PRIZE[guest.prize];

  li.appendChild(prizeLeftSpan);
  li.appendChild(nameSpan);
  li.appendChild(prizeRightSpan);
  listElement.appendChild(li);
}

// ----------------------------------------------------------------
// Type Interfaces
/**
 * 모임 Meetup
 * @typedef {object} Meetup
 * @property {string} id - 모임 ID
 * @property {string} title - 모임 이름
 * @property {string} description
 * @property {string} place
 * @property {number} createdAt
 * @property {Message[]} messages - 실제 메시지 내용
 * @property {Guest[]} guest - 실제 메시지 내용
 * @property {object} link {web: string, map: string}
 * @property {object} count {message: number, guest: number}
 */

/**
 * 메시지 Message
 * @typedef {object} Message
 * @property {string} id - 메시지 작성자의 ID (자동 생성)
 * @property {string} name - 메시지 작성자의 이름
 * @property {number} createdAt - 메시지 작성 시간 (타임스탬프 등)
 * @property {string} message - 실제 메시지 내용
 */

/**
 * 참여자 Geust
 * @typedef {object} Guest
 * @property {string} id - 참여자의 ID
 * @property {string} name - 참여자의 이름
 * @property {number} createdAt - 참여자 작성 시간
 * @property {number} prize - 당첨 여부
 */

// ----------------------------------------------------------------
/** firestore 관련 함수
 * 1. 새 메시지 생성
 * 2. 메시지 삭제
 * 3. 새 참여자 추가
 */

/** 1. 메시지 생성
 * @param {object} values - Message data object {name: string, text: string}
 */
async function createMessage(values) {
  const messageData = {
    id: uuid.v4(),
    createdAt: new Date().getTime(),
    ...values,
  };
  const updatedMessages = [...(groupData.messages || []), messageData];

  try {
    const groupDocRef = doc(db, "groups", groupData.id);
    const snapshot = await getDoc(groupDocRef);
    const data = snapshot.data();

    const newCount = {
      ...data.count,
      message: !data.messages?.length ? 0 + 1 : data.messages.length + 1,
    };

    await setDoc(
      groupDocRef,
      {
        messages: updatedMessages,
        count: newCount,
      },
      { merge: true }
    );

    console.log("Message successfully created and added to the group");
    return updatedMessages;
  } catch (err) {
    console.error("Error creating message:", err);
  }
}

/** 2. 메시지 삭제
 * @param {string} id - Message ID
 */
async function deleteMessage(id) {
  const confirmation = confirm("정말로 메시지를 삭제하시겠습니까?");
  if (!confirmation) {
    return;
  }

  try {
    const groupDocRef = doc(db, "groups", groupData.id);
    const snapshot = await getDoc(groupDocRef);
    const data = snapshot.data();

    const updatedMessages = (data.messages || []).filter(
      (message) => message.id !== id
    );
    const newCount = {
      ...data.count,
      message: (data.count && data.count.message) - 1 || 0,
    };

    await setDoc(
      groupDocRef,
      {
        messages: updatedMessages,
        count: newCount,
      },
      { merge: true }
    );

    console.log("Message successfully deleted from the group");
    return updatedMessages;
  } catch (err) {
    console.error("Error deleting message:", err);
  }
}

/**
 * 3. 참여자 리스트 패칭
 * @param {string} name 이름
 * @param {number} prize 당첨내용
 */
async function addGuest(name, prize) {
  const newGuest = {
    id: uuid.v4(),
    filteredName: addStarToName(name),
    name,
    prize,
    createdAt: new Date().getTime(),
  };

  try {
    const groupDocRef = doc(db, "groups", groupData.id);
    const snapshot = await getDoc(groupDocRef);
    const data = snapshot.data();

    const updatedGuests = [...(data.guests || []), newGuest];

    await setDoc(
      groupDocRef,
      {
        guests: updatedGuests,
      },
      { merge: true }
    );

    const GUEST_LIST = document.getElementById("guest-list");
    setGuestList(newGuest, GUEST_LIST);
    groupData.guests = updatedGuests;
    GEUEST_ASIDE.querySelector('input[name="name"]').value = "";

    console.log("New guest successfully added to the group");
    return updatedGuests;
  } catch (err) {
    console.error("Error adding new guest:", err);
  }
}

// -------------------------------------------------------
// rottie 애니메이션
const starAnimationContainer = document.getElementById("star");
const starAnimation = {
  container: starAnimationContainer,
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "/024/assets/star.json",
};

const confettiAnimationContainer = document.getElementById("confetti");
const confettiAnimation = {
  container: confettiAnimationContainer,
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "/024/assets/confetti.json",
};

const star = lottie.loadAnimation(starAnimation);
const confetti = lottie.loadAnimation(confettiAnimation);

RESULT_MODAL.querySelector("button.close").addEventListener("click", () => {
  toggleModal(RESULT_MODAL);
  setTimeout(() => {
    starAnimationContainer.classList.remove("show");
    starAnimationContainer.classList.add("hidden");
  }, 0);
});
RESULT_MODAL.querySelector(".shadow").addEventListener("click", () => {
  toggleModal(RESULT_MODAL);
  setTimeout(() => {
    starAnimationContainer.classList.remove("show");
    starAnimationContainer.classList.add("hidden");
  }, 0);
});

function toggleModal(modalElement) {
  const isModalOpen = modalElement.classList.contains("show");

  if (isModalOpen) {
    modalElement.classList.remove("show");
    modalElement.classList.add("hidden");
  } else {
    modalElement.classList.remove("hidden");
    modalElement.classList.add("show");
  }
}

RATE_MODAL.querySelector(".shadow").addEventListener("click", () => {
  toggleModal(RATE_MODAL);
  setTimeout(() => {
    starAnimationContainer.classList.remove("show");
    starAnimationContainer.classList.add("hidden");
  }, 0);
});

// -------------------------------------------------------
// 랜덤 뽑기
OPEN_RATE.addEventListener("click", () => {
  toggleModal(RATE_MODAL);
});

const prizes = [
  { rank: 1, probability: 0.15 },
  { rank: 2, probability: 0.25 },
  { rank: 3, probability: 0.5 },
];

OPEN_RESULT.addEventListener("click", () => {
  const resultName = RESULT_MODAL.querySelector(".result-content .name");
  const nameInput = GEUEST_ASIDE.querySelector("input[name='name']");
  const newName = nameInput.value;

  const isNameDuplicate = checkNameDuplicate(newName);
  if (isNameDuplicate) {
    alert("이미 등록된 이름입니다. 다른 이름을 입력해주세요.");
    return;
  }

  const prizeRank = randomResultHandler(newName);
  addGuest(newName, prizeRank);

  star.goToAndPlay(0);
  confetti.goToAndPlay(0);
  resultName.innerHTML = nameInput.value;

  starAnimationContainer.classList.remove("hidden");
  starAnimationContainer.classList.add("show");

  setTimeout(() => {
    toggleModal(RESULT_MODAL);
  }, 200);
});

function randomResultHandler(newName) {
  const randomValue = Math.random();
  let accumulatedProbability = 0;

  for (const prize of prizes) {
    accumulatedProbability += prize.probability;
    if (randomValue <= accumulatedProbability) {
      showResultModal(newName, prize.rank);
      return prize.rank;
    }
  }
}

function showResultModal(newName, rank) {
  const resultName = RESULT_MODAL.querySelector(".result-content .name");
  const resultTitle = RESULT_MODAL.querySelector(".result-content .title");
  const resultText = RESULT_MODAL.querySelector(".result-content .text");

  const results = [
    { title: "", text: "" },
    { title: "축하합니다!", text: "1등에 당첨되셨습니다!" },
    { title: "축하합니다!", text: "2등에 당첨되셨습니다!" },
    { title: "3등입니다", text: "다음 기회에 더 좋은 결과를 기대해주세요!" },
  ];

  resultName.innerText = newName;
  resultTitle.innerText = results[rank].title;
  resultText.innerText = results[rank].text;
}

// -------------------------------------------------------
// utils
function getIdFromString(str) {
  return new URLSearchParams(window.location.search).get(str);
}

function addStarToName(name) {
  const nameWithMaskedCharacter = name.split("");
  const randomIndex = Math.floor(
    Math.random() * nameWithMaskedCharacter.length
  );
  nameWithMaskedCharacter[randomIndex] = "*";

  return nameWithMaskedCharacter.join("");
}

function checkNameDuplicate(newName) {
  if (groupData.guests === undefined || groupData.guests?.length <= 0)
    return false;

  const existingNames = groupData.guests.map((guest) => guest.name);
  return existingNames.includes(newName);
}
