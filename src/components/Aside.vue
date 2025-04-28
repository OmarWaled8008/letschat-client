<template>
  <aside class="sidebar">
    <div class="profile">
      <div class="bg-gradiante"></div>
      <div class="profile-content">
        <img src="/public/download.png" alt="" />
        <div class="follow">
          <div class="follow-num">
            <h3>{{ followersCount }}</h3>
            <p class="gg">Followers</p>
          </div>
          <div class="follow-num">
            <h3>{{ followingCount || 0 }}</h3>
            <p class="gg">Following</p>
          </div>
        </div>
        <div class="name-prof">
          <h3>{{ info?.username }}</h3>
          <span class="gg">{{ info?.email }}</span>
        </div>
        <p class="bio-prof">
          {{ info?.bio }}
        </p>
        <router-link class="btn-prof" to="/profile">My Profile</router-link>
      </div>
    </div>

    <div class="skills">
      <h3>Skills</h3>
      <div class="tags">
        <span>UX Designer</span>
        <span>Front and Back End Developer</span>
        <span>JS coder</span>
        <span>UX Designer</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onUpdated } from "vue";
import { useUserStore } from "../store/userstore";
import { storeToRefs } from "pinia";

let info = ref({});

const userStore = useUserStore();
const { currUser, getUserInfo } = userStore;
getUserInfo(currUser)
  .then((res) => {
    info.value = res;
  })
  .catch((err) => {
    console.error(err);
  });

const followersCount = computed(() => info.value.followers?.length || 0);
const followingCount = computed(() => info.value.following?.length || 0);

onUpdated(() => {
  getUserInfo(currUser)
    .then((res) => {
      info.value = res;
    })
    .catch((err) => {
      console.error(err);
    });
});
</script>
