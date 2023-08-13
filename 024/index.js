import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
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
const SAVED_COLLECTION_ID = "3e0768b0-d92c-47e5-ba57-c25c794d9e78";

// Firebase 초기화
// Firestore 인스턴스 생성
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
let groupData = await getGroup(SAVED_COLLECTION_ID);

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
MEETUP_ID.innerText = SAVED_COLLECTION_ID;

// 인풋
const NAME_INPUT = document.getElementById("name-input");
const MESSAGE_INPUT = document.getElementById("message-input");

// 버튼
const SAVE_BUTTON = document.getElementById("save-button");
const OPEN_RESULT = document.getElementById("show-result-button");
const OPEN_RATE = document.getElementById("show-rate-button");

// 모달
const RESULT_MODAL = document.getElementById("result-modal");
const RATE_MODAL = document.getElementById("rate-modal");

/** 초기화 initialize
 * 1. 메시지 리스트 초기화
 * 2. 참여자 리스트 초기화
 * 3. 모임 정보 초기화
 */
async function initialize(group) {
  initializeMessages(group);
  initializeMeetup(group);
}
initialize(groupData);

async function initializeMessages(group) {
  const MESSAGE_COUNT = document.getElementById("message-count");
  MESSAGE_COUNT.appendChild(document.createTextNode(group.count.message));

  const MESSAGE_LIST = document.getElementById("message-list");
  const list = group.messages;

  list.forEach((message) => {
    initMessageList(message, MESSAGE_LIST);
  });
}

async function initializeMeetup(group) {
  const MEETUP = document.getElementById("meetup-info");
  const { map, web } = group.link;

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
  const name = NAME_INPUT.value;
  const message = MESSAGE_INPUT.value;
  2;

  const MESSAGE_LIST = document.getElementById("message-list");
  const MESSAGE_COUNT = document.getElementById("message-count");

  if (name && message) {
    createMessage({ name, message });
    initMessageList({ name, message }, MESSAGE_LIST);

    MESSAGE_INPUT.value = "";
    NAME_INPUT.value = "익명";
    groupData.count.message += 1;
    MESSAGE_COUNT.textContent = groupData.count.message;
  }
});

function initMessageList(message, listElement) {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  const textSpan = document.createElement("span");

  const deleteButton = document.createElement("i");
  deleteButton.classList.add("fas");
  deleteButton.classList.add("fa-trash");
  deleteButton.classList.add("delete");

  li.classList.add("message-item");
  nameSpan.classList.add("name");
  textSpan.classList.add("text");

  nameSpan.textContent = message.name;
  textSpan.textContent = message.message;

  li.appendChild(nameSpan);
  li.appendChild(textSpan);
  li.appendChild(deleteButton);
  listElement.prepend(li);
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
/** 함수
 * 1. 메시지 리스트 패칭
 * {name: '김파이어', createdAt: '2232132', message: ""}
 * 2. 메시지 생성
 * 3. 메시지 삭제
 * 4. 참여자 리스트 패칭
 * 5. 참여자 리스트에 참여자 추가
 */
// ----------------------------------------------------------------

/** 1. 메시지 리스트 패칭
 * @param {string} collectionId 컬렉션 ID
 * @returns {Array} 메시지 리스트
 */
async function getGroup(collectionId) {
  const col = collection(db, "groups");
  const snapshot = await getDocs(col);
  const groups = snapshot.docs.map((doc) => doc.data());

  return groups.find((e) => e.id === collectionId);
}

/**
 * 2. 메시지 생성
 * @param {string} collectionId - Collection ID
 * @param {object} nameAndText - Message data object {name: string, text: string}
 */
async function createMessage(values) {
  const messageData = {
    id: uuid.v4(),
    createdAt: new Date().getTime(),
    ...values,
  };
  const updatedMessages = [...groupData.messages, messageData];

  try {
    const groupDocRef = doc(db, "groups", groupData.id);
    const snapshot = await getDoc(groupDocRef);
    const data = snapshot.data();

    const newCount = {
      ...data.count,
      message: data.messages.length + 1,
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
  } catch (err) {
    console.error("Error creating message:", err);
  }
}

// 삭제 버튼 클릭 시
// function deleteMessage(messageId) {
//   if (confirm("정말로 이 메시지를 삭제하시겠습니까?")) {
//     deleteMessageFromFirestore(messageId); // Firestore에서 메시지 삭제
//     refreshMessageList(); // 메시지 리스트 갱신
//   }
// }
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
  randomResultHandler();

  star.goToAndPlay(0);
  confetti.goToAndPlay(0);

  starAnimationContainer.classList.remove("hidden");
  starAnimationContainer.classList.add("show");

  setTimeout(() => {
    toggleModal(RESULT_MODAL);
  }, 200);
});

function randomResultHandler() {
  const randomValue = Math.random();
  let accumulatedProbability = 0;

  for (const prize of prizes) {
    accumulatedProbability += prize.probability;
    if (randomValue <= accumulatedProbability) {
      showResultModal(prize.rank);
      break;
    }
  }
}

function showResultModal(rank) {
  const resultContent = document.getElementById("result-content");

  if (rank === 1) {
    resultContent.innerHTML = `
      <h2>축하합니다!</h2>
      <p>1등에 당첨되셨습니다!</p>
    `;
  } else if (rank === 2) {
    resultContent.innerHTML = `
      <h2>축하합니다!</h2>
      <p>2등에 당첨되셨습니다!</p>
    `;
  } else if (rank === 3) {
    resultContent.innerHTML = `
      <h2>3등입니다</h2>
      <p>다음 기회에 더 좋은 결과를 기대해주세요!</p>
    `;
  }
}
