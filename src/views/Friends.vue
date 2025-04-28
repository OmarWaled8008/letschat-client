<template>
  <div class="loading" v-if="!suggestions || suggestions.length === 0">
    <scaling-squares-spinner
      :animation-duration="1250"
      :size="65"
      color="#858585"
    />
  </div>
  <div v-else class="containerfriends">
    <Aside />
    <main class="main-content-friends">
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
        <button
          @click="activeTab = 'suggestions'"
          :class="{ active: activeTab === 'suggestions' }"
        >
          People to Follow
        </button>
      </div>

      <div class="follow-list">
        <div v-if="activeTab === 'followers'">
          <FollowCard
            v-for="user in followers"
            :key="user._id"
            :user="user"
            type="follower"
          />
        </div>

        <div v-if="activeTab === 'following'">
          <FollowCard
            v-for="user in following"
            :key="user._id"
            :user="user"
            type="following"
          />
        </div>

        <div v-if="activeTab === 'suggestions'">
          <FollowCard
            v-for="user in suggestions"
            :key="user._id"
            :user="user"
            type="suggestion"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import Aside from "../components/Aside.vue";
import FollowCard from "../components/Followcard.vue";
import { useUserStore } from "../store/userstore";
import { ScalingSquaresSpinner } from "epic-spinners";
import { storeToRefs } from "pinia";

const activeTab = ref("followers");

const userStore = useUserStore();
const { getFollowers, getFollowing, getSuggestions } = userStore;
const { currUser } = userStore;
const { followers, following, suggestions } = storeToRefs(userStore);
onMounted(() => {
  getFollowers();
  getFollowing();
  getSuggestions();
});
onUpdated(() => {
  getFollowers();
  getFollowing();
  getSuggestions();
});
</script>

