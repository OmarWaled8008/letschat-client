import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import apiUrl from "../apis/host";

export const useChatStore = defineStore("chat", () => {
  const currUser = jwtDecode(Cookies.get("token")).userId;
  const chats = ref([]);
  const messages = ref([]);

  const createChat = async (receiverId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/chat/`,
        {
          senderId: currUser,
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const createMessage = async (chatId, message) => {
    try {
      const response = await axios.post(
        `${apiUrl}/chat/message/`,
        {
          chatId,
          senderId: currUser,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating message:", error);
    }
  };

  const getChats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/chat/${currUser}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      chats.value = response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const getMessages = async (chatId) => {
    try {
      const response = await axios.get(`${apiUrl}/chat/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      messages.value = response.data;
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return {
    currUser,
    chats,
    messages,
    createChat,
    createMessage,
    getChats,
    getMessages,
  };
});
