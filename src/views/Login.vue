<template>
  <div class="container">
    <div class="login-section">
      <h1>Welcome Back</h1>
      <p class="pp">Lorem ipsum dolor sit amet</p>

      <form @submit.prevent="handleSubmit">
        <div class="input-wrapper">
          <label for="email">Email</label>
          <input
            v-model="email"
            @focus="focused"
            type="text"
            placeholder="Enter email here"
          />
        </div>

        <div class="input-wrapper">
          <label for="password">Password</label>
          <input
            v-model="password"
            @focus="focused"
            type="password"
            placeholder="Enter password here"
          />
        </div>
        <button class="login-btn">Login</button>

        <p class="login-text">
          Don't have an account?
          <router-link to="/register">Signup</router-link>
        </p>
      </form>
      <p class="error"></p>
    </div>
    <div class="brand-section">
      <div class="branding">
        <div class="div-chat-logo">
          <img src="../assets/logo.png" class="chat-logo" alt="Chat Icon" />
        </div>
        <p>
          Lorem ipsum dolor sit amet. Eos similique alias est voluptas galisum
          in eligendi
        </p>
        <div class="dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { toast } from "vue3-toastify";
import axios from "axios";
import apiUrl from "../apis/host";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const email = ref("");
const password = ref("");
const router = useRouter();

async function handleSubmit() {
  const errorMessage = document.querySelector(".error");
  if (!email || !password) {
    errorMessage.innerHTML =
      "<i class='fa-solid fa-circle-exclamation'></i> Please fill in all fields.";
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    errorMessage.innerHTML = "";
    try {
      let { data } = await axios.post(
        `${apiUrl}/auth/login`,
        {
          user: email.value,
          password: password.value,
        },
        { withCredentials: true }
      );
      console.log(data);
      Cookies.set("token", data.token, { expires: 1 });
      toast(`${data.message}`, {
        autoClose: 2000,
        type: "success",
        position: "top-center",
        transition: "flip",
        dangerouslyHTMLString: true,
      });
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err) {
      errorMessage.innerHTML =
        "<i class='fa-solid fa-circle-exclamation'></i> Invalid email or password.";
      errorMessage.style.display = "block";
    }
  }
}
function focused(e) {
  const errorMessage = document.querySelector(".error");
  errorMessage.style.display = "none";
  errorMessage.innerHTML = "";
}
</script>
