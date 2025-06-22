// app.js
// برای نمونه، سیستم روم و پسورد ساده و محلی تعریف شده

const rooms = {
  "AMvibes": "alimary651",
  "frind room-1": "frind room-1",
  "dostane": "1403"
};

const loginDiv = document.getElementById("login");
const chatRoomDiv = document.getElementById("chat-room");
const joinBtn = document.getElementById("join-btn");
const logoutBtn = document.getElementById("logout-btn");
const errorMsg = document.getElementById("error-msg");
const roomTitle = document.getElementById("room-title");
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");

let currentRoom = null;

// تابع ورود به روم
function joinRoom() {
  const roomId = document.getElementById("room-id").value.trim();
  const roomPass = document.getElementById("room-password").value.trim();

  if (!roomId || !roomPass) {
    errorMsg.textContent = "Please enter both Room ID and Password.";
    return;
  }

  if (!(roomId in rooms)) {
    errorMsg.textContent = "Room ID not found.";
    return;
  }

  if (rooms[roomId] !== roomPass) {
    errorMsg.textContent = "Incorrect password.";
    return;
  }

  // موفقیت ورود
  errorMsg.textContent = "";
  currentRoom = roomId;
  roomTitle.textContent = `Room: ${currentRoom}`;

  loginDiv.style.display = "none";
  chatRoomDiv.style.display = "flex";

  loadMessages();
}

// تابع بارگذاری پیام‌ها (این نمونه فقط پیام‌های ثابت است)
// تو پروژه واقعی باید پیام‌ها رو از سرور یا پایگاه داده بگیری
function loadMessages() {
  messagesDiv.innerHTML = "";
  // پیام خوش آمدگویی ساده
  const welcomeMsg = document.createElement("div");
  welcomeMsg.classList.add("message", "received");
  welcomeMsg.textContent = `Welcome to ${currentRoom}! Start chatting now.`;
  messagesDiv.appendChild(welcomeMsg);
}

// ارسال پیام ساده محلی (بدون سرور)
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", "sent");
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);

  messageInput.value = "";
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function logoutRoom() {
  currentRoom = null;
  messagesDiv.innerHTML = "";
  loginDiv.style.display = "flex";
  chatRoomDiv.style.display = "none";
  document.getElementById("room-id").value = "";
  document.getElementById("room-password").value = "";
  errorMsg.textContent = "";
}

// دکمه‌ها رو وصل کن
joinBtn.addEventListener("click", joinRoom);
sendBtn.addEventListener("click", sendMessage);
logoutBtn.addEventListener("click", logoutRoom);

// امکان ارسال پیام با کلید Enter
messageInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
