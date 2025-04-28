<template>
  <div class="follow-card">
    <img src="https://i.pravatar.cc/40" alt="User Avatar" />
    <div class="user-info">
      <h4>{{ user.username }}</h4>
      <p>{{ user.email }}</p>
    </div>
    <div class="actions">
      <button v-if="type === 'suggestion'" @click="followUser(user._id)">
        Follow
      </button>
      <button v-else-if="type === 'following'" @click="unFollowUser(user._id)">
        Unfollow
      </button>
      <button
        v-else-if="type === 'follower' && !isFollowing(user._id)"
        @click="followUser(user._id)"
      >
        Follow Back
      </button>
      <button
        v-else-if="type === 'follower' && isFollowing(user._id)"
        @click="unFollowUser(user._id)"
      >
        Unfollow
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/userstore";
const userStore = useUserStore();

const { followUser, unFollowUser, isFollower, isFollowing } = userStore;
let props = defineProps(["user", "type"]);
</script>

<style scoped>
.follow-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg);
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  margin-bottom: 20px;
}

.follow-card img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
}

.user-info {
  flex: 1;
  color: var(--text-w);
}

.user-info h4 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.user-info p {
  margin: 4px 0 0;
  color: #858585;
  font-size: 14px;
}

.actions button {
  background: var(--primary);
  color: var(--text-d);
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
</style>
