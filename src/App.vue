<template>
  <button @click="toggleDarkMode()" class="lightdarkbtn">
    <i v-if="darkMode" class="fas fa-sun"></i>
    <i v-else class="fas fa-moon"></i>
  </button>
  <router-view />
</template>

<script setup>
import { ref } from "vue";
let darkMode = ref(true);
const darkModeStorage = localStorage.getItem("darkMode");
function checkDarkMode() {
  if (!darkModeStorage) {
    darkMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  } else if (darkModeStorage === "true") {
    darkMode.value = true;
    localStorage.setItem("darkMode", darkMode.value);
    document.body.classList.add("dark-theme");
  } else {
    darkMode.value = false;
    localStorage.setItem("darkMode", darkMode.value);
    document.body.classList.add("light-theme");
  }
}
checkDarkMode();
function toggleDarkMode() {
  darkMode.value = !darkMode.value;
  localStorage.setItem("darkMode", darkMode.value);
  if (darkMode.value) {
    document.body.classList.add("dark-theme");
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
  }
}
</script>
