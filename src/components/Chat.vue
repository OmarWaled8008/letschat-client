<template>
  <div class="chat-header">
    <div class="user-info">
      <img src="/public/download.png" alt="Aman" />
      <div>
        <strong>Aman</strong>
        <p>Active 1 min ago.</p>
      </div>
    </div>
  </div>

  <div class="chat-body" ref="chatBody">
    <div
      v-for="msg in messages"
      :key="msg._id"
      :class="{
        msg: true,
        left: msg.senderId._id !== currUser,
        right: msg.senderId._id === currUser,
      }"
    >
      <p>{{ msg.text }}</p>
    </div>
  </div>

  <div class="chat-footer">
    <input
      type="text"
      v-model="messageText"
      placeholder="Type your message..."
      @keyup.enter="sendMessage"
    />
    <button @click="sendMessage">
      <i class="fas fa-paper-plane"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import socket from "../socket.js";
import { useChatStore } from "../store/chatStore";
import { storeToRefs } from "pinia";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const currUser = jwtDecode(Cookies.get("token")).userId;
const route = useRoute();
const chatId = ref(route.params.chatId);
const chatStore = useChatStore();
const { getMessages } = chatStore;
const { messages } = storeToRefs(chatStore);

const messageText = ref("");
const onlineUsers = ref([]);
const chatBody = ref(null);

onMounted(async () => {
  if (currUser) {
    socket.emit("join", { userId: currUser });
  }

  socket.on("getUsers", (data) => {
    onlineUsers.value = data;
  });

  if (!socket.hasListeners("getMessage")) {
    socket.on("getMessage", async (data) => {
      messages.value.push(data);
      await nextTick();
      scrollToBottom();
    });
  }

  scrollToBottom();

  getMessages(chatId.value).then(async () => {
    scrollToBottom();
  });
});

const sendMessage = async () => {
  socket.emit("sendMessage", {
    chatId: chatId.value,
    senderId: currUser,
    text: messageText.value,
  });

  messages.value.push({
    senderId: { _id: currUser },
    text: messageText.value,
  });

  messageText.value = "";
  await nextTick();
  scrollToBottom();
};

const scrollToBottom = () => {
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  }
};

watch(
  () => route.params.chatId,
  (newChatId) => {
    chatId.value = newChatId;
    getMessages(chatId.value).then(async () => {
      scrollToBottom();
    });
  }
);
</script>
