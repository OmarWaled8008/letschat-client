<template>
  <div class="containerchat">
    <div class="containerchat-child">
      <div class="sidebar">
        <h3 class="sidebar-title">Friends</h3>
        <input type="text" class="search" placeholder="Search Messages" />
        <div class="follow-tabs">
          <button
            @click="activeTab = 'followers'"
            :class="{ active: activeTab === 'followers' }"
          >
            Followers
          </button>
          <button
            @click="activeTab = 'following'"
            :class="{ active: activeTab === 'following' }"
          >
            Following
          </button>
        </div>
        <div v-if="activeTab === 'followers'" class="messages">
          <div v-for="user in followers" :key="user._id">
            <button @click="createNewChat(user._id)" class="message">
              <img src="/public/download.png" />
              <div :class="{ online: isOnline(user._id) }">
                <strong>{{ user.username }}</strong>
                <p>{{ user.email }}</p>
              </div>
            </button>
          </div>
        </div>
        <div v-if="activeTab === 'following'" class="messages">
          <div v-for="user in following" :key="user._id">
            <button @click="createNewChat(user._id)" class="message">
              <img src="/public/download.png" />
              <div :class="{ online: isOnline(user._id) }">
                <strong>{{ user.username }}</strong>
                <p>{{ user.email }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="chat">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chat from "../components/Chat.vue";
import socket from "../socket.js";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../store/userstore";
import { useChatStore } from "../store/chatStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated, ref } from "vue";
const userStore = useUserStore();
const { getFollowers, getFollowing, getSuggestions } = userStore;
const { currUser } = userStore;
const { followers, following } = storeToRefs(userStore);
const activeTab = ref("followers");
const onlineUsers = ref([]);

const isOnline = (userId) => {
  return onlineUsers.value.some((user) => user.userId === userId);
};

const router = useRouter();
const chatStore = useChatStore();
const { createChat, getChats } = chatStore;
const { chats } = storeToRefs(chatStore);

const createNewChat = async (userId) => {
  try {
    const response = await createChat(userId);
    console.log("Chat created successfully:", response);
    router.push(`/conversations/${response._id}`);
  } catch (error) {
    console.error("Error creating chat:", error);
  }
};

onMounted(() => {
  if (currUser) {
    socket.emit("join", { userId: currUser });
  }

  socket.on("getUsers", (data) => {
    onlineUsers.value = data;
  });

  getFollowers().then(() => {});
  getFollowing().then(() => {});
});
</script>

<style>
.online::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  margin-right: 5px;
}
</style>

<style scoped lang="scss"></style>
