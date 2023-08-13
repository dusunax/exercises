import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
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

// Firebase 초기화
// Firestore 인스턴스 생성
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const SAVED_COLLECTION_ID = "3e0768b0-d92c-47e5-ba57-c25c794d9e78";

// --------------------------------
// dom elements
const MESSAGE_INPUT = document.getElementById("message-input");
const NAME_INPUT = document.getElementById("name-input");
const SAVE_BUTTON = document.getElementById("save-button");
const MESSAGE_COUNT = document.getElementById("message-count");
const MESSAGE_LIST = document.getElementById("message-list");

SAVE_BUTTON.addEventListener("click", () => {
  const name = NAME_INPUT.value;
  const message = MESSAGE_INPUT.value;

  addMessageElement({ name, message }, MESSAGE_LIST);

  if (name && message) {
    createMessage(SAVED_COLLECTION_ID, { name, message });
    MESSAGE_INPUT.value = "";
    NAME_INPUT.value = "익명";
  }
});

function addMessageElement(message, listElement) {
  const li = document.createElement("li");
  const nameSpan = document.createElement("span");
  const textSpan = document.createElement("span");

  li.classList.add("message-item");
  nameSpan.classList.add("name");
  textSpan.classList.add("text");

  nameSpan.textContent = message.name;
  textSpan.textContent = message.message;

  li.appendChild(nameSpan);
  li.appendChild(textSpan);
  listElement.prepend(li);
}

// ----------------------------------------------------------------
// Type Interfaces
/**
 * 메시지 Message
 * @typedef {Object} Message
 * @property {String} messageId - 메시지 작성자의 ID (자동 생성)
 * @property {string} name - 메시지 작성자의 이름
 * @property {string} createdAt - 메시지 작성 시간 (타임스탬프 등)
 * @property {string} message - 실제 메시지 내용
 */

/**
 * 참여자 Geust
 * @typedef {Object} Guest
 * @property {String} guestId - 참여자의 ID
 * @property {string} name - 참여자의 이름
 * @property {string} createdAt - 참여자 작성 시간
 * @property {number} prize - 당첨 여부
 */
async function getListOfMessages() {
  const list = await fetchList(SAVED_COLLECTION_ID);

  list.forEach((message) => {
    addMessageElement(message, MESSAGE_LIST);
  });

  MESSAGE_COUNT.appendChild(document.createTextNode(list.length));
}
getListOfMessages();

// ----------------------------------------------------------------
/** 함수
 * 1. 메시지 리스트 패칭
 * {name: '김파이어', createdAt: '2232132', message: ""}
 * 2. 메시지 생성
 * 3. 메시지 수정
 * 4. 메시지 삭제
 * 5. 참여자 리스트 패칭
 * 6. 참여자 리스트에 참여자 추가
 * 7. 참여자 리스트의 참여자 수정
 */
// ----------------------------------------------------------------

/** 1. 메시지 리스트 패칭
 * @param {string} collectionId 컬렉션 ID
 * @returns {Array} 메시지 리스트
 */
async function fetchList(collectionId) {
  const col = collection(db, collectionId);
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map((doc) => doc.data());

  return list;
}

/**
 * 2. 메시지 생성
 * @param {string} collectionId - Collection ID
 * @param {object} nameAndText - Message data object {name: string, text: string}
 */
async function createMessage(collectionId, values) {
  const { name, message } = values;
  const messageData = {
    messageId: uuid.v4(),
    createdAt: new Date().getTime(),
    name,
    message,
  };

  await setDoc(doc(db, collectionId, messageData.messageId), messageData);
}
