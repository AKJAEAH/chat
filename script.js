// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiLEB8f054twl-VUFgEOteJppUNviFLWI",
  authDomain: "chat-46ad8.firebaseapp.com",
  projectId: "chat-46ad8",
  storageBucket: "chat-46ad8.appspot.com",
  messagingSenderId: "828976114177",
  appId: "1:828976114177:web:6d26ad6927f1f52fb8ee00",
  measurementId: "G-26CFQ7LV9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const createChatButton = document.getElementById('create-chat');
const joinChatButton = document.getElementById('join-chat');
const sendMessageButton = document.getElementById('send-message');
const enterChatButton = document.getElementById('enter-chat');
const chatRoom = document.getElementById('chat-room');
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const codeContainer = document.getElementById('code-container');
const chatCodeInput = document.getElementById('chat-code-input');

let chatCode = '';

createChatButton.addEventListener('click', createChat);
joinChatButton.addEventListener('click', () => {
    codeContainer.style.display = 'block';
});

enterChatButton.addEventListener('click', joinChat);
sendMessageButton.addEventListener('click', sendMessage);

function createChat() {
    chatCode = generateChatCode();
    alert(`Chat created. Your code is: ${chatCode}`);
    chatRoom.style.display = 'block';
    setupChatListeners(chatCode);
}

function joinChat() {
    chatCode = chatCodeInput.value;
    if (chatCode) {
        chatRoom.style.display = 'block';
        codeContainer.style.display = 'none';
        setupChatListeners(chatCode);
    } else {
        alert('Please enter a valid chat code.');
    }
}

function sendMessage() {
    const message = messageInput.value;
    if (message) {
        const timestamp = Date.now();
        set(ref(database, `chats/${chatCode}/${timestamp}`), message);
        messageInput.value = '';
    }
}

function setupChatListeners(code) {
    const chatRef = ref(database, `chats/${code}`);
    onChildAdded(chatRef, (snapshot) => {
        const message = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
}

function generateChatCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}
