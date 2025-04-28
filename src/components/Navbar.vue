<template>
  <div class="topbar">
    <div class="top-left">
      <img src="../assets/logo.png" alt="Logo" class="logo" />
      <input type="text" placeholder="#Explore" class="top-search" />
    </div>

    <div class="hamburger" @click="toggleNav">
      <i class="fas fa-bars"></i>
    </div>

    <div :class="['top-middle', { show: isNavOpen }]">
      <router-link to="/home" class="top-icon">
        <i class="fas fa-home"></i>
      </router-link>
      <router-link to="/follow" class="top-icon">
        <i class="fas fa-user"></i>
      </router-link>
      <router-link to="/conversations" class="top-icon">
        <i class="fas fa-comment"></i>
      </router-link>
    </div>

    <div class="top-right">
      <img src="/public/download.png" alt="User" class="avatar" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isNavOpen = ref(false);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};
</script>
