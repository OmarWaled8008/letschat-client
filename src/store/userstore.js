import { defineStore } from "pinia";
import { computed, ref } from "vue";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import apiUrl from "../apis/host";

export const useUserStore = defineStore("user", () => {
  const currUser = jwtDecode(Cookies.get("token")).userId;
  const followers = ref([]);
  const following = ref([]);
  const suggestions = ref([]);

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  const getFollowers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/followers/${currUser}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      followers.value = response.data;
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const getFollowing = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/following/${currUser}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      following.value = response.data;
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };
  const getSuggestions = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/user/suggestions/${currUser}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      suggestions.value = response.data;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  function isFollowing(userId) {
    return following.value.some((user) => user._id === userId);
  }

  function isFollower(userId) {
    return followers.value.some((user) => user._id === userId);
  }

  const followUser = async (idUser) => {
    try {
      console.log("Following user:", idUser);
      console.log("Current user:", currUser);
      const response = await axios.put(
        `${apiUrl}/user/follow/${idUser}`,
        { _id: currUser },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      getFollowing();
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  const unFollowUser = async (idUser) => {
    try {
      const response = await axios.put(
        `${apiUrl}/user/unfollow/${idUser}`,
        { _id: currUser },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      getFollowing();
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
  return {
    currUser,
    getUserInfo,
    followers,
    following,
    suggestions,
    getFollowers,
    getFollowing,
    getSuggestions,
    isFollower,
    isFollowing,
    followUser,
    unFollowUser,
  };
});
