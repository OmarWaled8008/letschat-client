<template>
  <div class="loading" v-if="!timeline || timeline.length === 0">
    <scaling-squares-spinner
      :animation-duration="1250"
      :size="65"
      color="#858585"
    />
  </div>
  <div v-else class="containerhome">
    <Aside />
    <main class="main-content">
      <div class="addpost">
        <img src="https://i.pravatar.cc/40" alt="User Avatar" />
        <form @submit.prevent="handleSubmit">
          <input
            type="text"
            name="caption"
            id="caption"
            v-model.lazy="caption"
            placeholder="Tell your friends about your thoughts.."
          />
          <label for="image">
            <i class="fas fa-images"></i>
            <input
              type="file"
              name="image"
              id="image"
              @change="handleFileUpload($event)"
            />
          </label>
          <button type="submit">Post</button>
        </form>
      </div>

      <div v-for="post in timeline" :key="post._id">
        <div class="post">
          <div class="post-header">
            <img
              :src="post.userId.profilePic || `https://i.pravatar.cc/50`"
              alt="User Avatar"
            />
            <div class="info">
              <p>{{ post.userId.email }}</p>
              <h4>{{ post.userId.username }}</h4>
              <span class="time">{{ getRelativeTime(post.createdAt) }}</span>
            </div>
          </div>

          <div class="post-text">
            <p>{{ post.caption }}</p>
          </div>

          <div class="post-image">
            <img v-show="post.image" :src="post.image" alt="Post Image" />
          </div>

          <div class="post-actions">
            <div class="icons">
              {{ post.likes.length }}
              <i
                v-if="!post.likes.includes(currUser)"
                @click="addLikeToPost(post._id)"
                class="fas fa-heart"
              ></i>
              <i
                v-else
                @click="addLikeToPost(post._id)"
                class="fas fa-heart liked"
              ></i>
              {{ post.comments.length }} <i class="fas fa-comment"></i>
            </div>
          </div>

          <div class="post-comment">
            <img src="https://i.pravatar.cc/36" alt="User Avatar" />
            <input
              name="text"
              type="text"
              @blur="blured($event)"
              @input="handleCommentInput($event)"
              placeholder="Write your comment..."
            />
            <i @click="addcomment(post._id)" class="fas fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </main>

    <aside class="activity">
      <h3>Suggestion</h3>
      <div v-for="user in suggestions" :key="user._id" class="activity-item">
        <img src="https://i.pravatar.cc/40" alt="User" />
        <div>
          <p>{{ user.username }}</p>
          <button @click="followUser(user._id)">Follow</button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import Aside from "../components/Aside.vue";
import { storeToRefs } from "pinia";
import { onMounted, onUpdated, ref } from "vue";
import { usePostStore } from "../store/poststore";
import { useUserStore } from "../store/userstore";
import { ScalingSquaresSpinner } from "epic-spinners";

const postStore = usePostStore();
const userStore = useUserStore();
const { currUser, getSuggestions, followUser } = userStore;
const { getTimeline, addPost, addComment, addLike } = postStore;
const { timeline } = storeToRefs(postStore);
const { suggestions } = storeToRefs(userStore);


const caption = ref("");
const image = ref(null);
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
  }
};
const handleSubmit = async () => {
  try {
    await addPost({
      userId: currUser,
      caption: caption.value,
      image: image.value,
    });
    caption.value = "";
    image.value = null;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
const text = ref("");
const handleCommentInput = (event) => {
  text.value = event.target.value;
};
const blured = (event) => {
  event.target.value = "";
};
const addcomment = async (postId) => {
  try {
    await addComment(postId, currUser, text.value);
    text.value = "";
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};
function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  if (isNaN(date)) return "Invalid date";
  const isFuture = diffMs < 0;
  const diff = Math.abs(diffMs);
  const units = [
    { label: "y", ms: 1000 * 60 * 60 * 24 * 365 },
    { label: "mo", ms: 1000 * 60 * 60 * 24 * 30 },
    { label: "d", ms: 1000 * 60 * 60 * 24 },
    { label: "h", ms: 1000 * 60 * 60 },
    { label: "m", ms: 1000 * 60 },
    { label: "s", ms: 1000 },
  ];
  for (const unit of units) {
    const value = Math.floor(diff / unit.ms);
    if (value > 0) {
      return `${value}${unit.label} ${isFuture ? "from now" : "ago"}`;
    }
  }
  return "just now";
}
const addLikeToPost = async (postId) => {
  try {
    await addLike(postId, currUser);
  } catch (error) {
    console.error("Error adding like:", error);
  }
};
onMounted(() => {
  getSuggestions();
  getTimeline();
});

onUpdated(() => {
  getTimeline();
  getSuggestions();
});
</script>
