import { defineStore } from "pinia";
import { computed, ref } from "vue";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import apiUrl from "../apis/host";
import { toast } from "vue3-toastify";

export const usePostStore = defineStore("post", () => {
  let timeline = ref([]);
  const getTimeline = async () => {
    try {
      const response = await axios.get(`${apiUrl}/post/timeline/posts`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      timeline.value = response.data;
    } catch (error) {
      console.error("Error fetching timeline:", error);
    }
  };
  const addPost = async ({ userId, caption, image }) => {
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("userId", userId);
      if (image) {
        formData.append("image", image);
      }
      const response = await axios.post(`${apiUrl}/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("Post added successfully:", response);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  const addComment = async (postId, userId, text) => {
    try {
      const response = await axios.post(
        `${apiUrl}/comment/${postId}`,
        { postId, userId, text },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("Comment added successfully:", response);
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const addLike = async (postId, userId) => {
    try {
      const response = await axios.put(
        `${apiUrl}/post/like/${postId}`,
        { postId, userId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("Like added successfully:", response);
      if (response.data[1].message === "post unliked successfully") {
        toast.success("Post unliked successfully!");
      } else {
        toast.success("Post liked successfully!");
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };
  const getLikes = async (postId) => {
    try {
      const response = await axios.get(`${apiUrl}/post/like/${postId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("Likes fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  return { timeline, getTimeline, addPost, addComment, addLike, getLikes };
});
