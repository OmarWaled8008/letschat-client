<template>
  <div class="container">
    <div class="signup-section">
      <h1>Create Account</h1>
      <p class="pp">Join Chattr today</p>

      <form @submit.prevent="handleSubmit">
        <div class="input-warpper">
          <label for="username"> UserName</label>
          <input
            @focus="focused"
            @blur="blurred"
            v-model.lazy="username"
            name="username"
            id="username"
            type="text"
            placeholder="Enter your name"
          />
          <p class="error-input"></p>
        </div>

        <div class="input-warpper">
          <label for="text">Email</label>
          <input
            @focus="focused"
            @blur="blurred"
            v-model.lazy="email"
            name="email"
            id="email"
            type="text"
            placeholder="Enter your email"
          />
          <p class="error-input"></p>
        </div>

        <div class="input-warpper">
          <label for="text">Bio</label>
          <input
            @focus="focused"
            @blur="blurred"
            v-model.lazy="bio"
            name="bio"
            id="bio"
            type="text"
            placeholder="Enter your bio"
          />
          <p class="error-input"></p>
        </div>

        <div class="input-warpper">
          <label for="text">Profile Picture</label>
          <input
            @change="handleFileUpload($event)"
            @focus="focused"
            @blur="blurred"
            name="profilePic"
            id="profilePic"
            type="file"
            placeholder="Enter your Profile Picture"
          />
          <p class="error-input"></p>
        </div>

        <div class="input-warpper">
          <label for="password">Password</label>
          <input
            @focus="focused"
            @blur="blurred"
            v-model.lazy="password"
            name="password"
            id="password"
            type="password"
            placeholder="Create a password"
          />
          <p class="error-input"></p>
        </div>

        <div class="input-warpper">
          <label for="confirm-password">Confirm Password</label>
          <input
            @focus="focused"
            @blur="blurred"
            v-model.lazy="confirmPassword"
            name="confirm-password"
            id="confirm-password"
            type="password"
            placeholder="Re-enter your password"
          />
          <p class="error-input"></p>
        </div>

        <button class="signup-btn">Sign Up</button>

        <p class="login-text">
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </form>
      <p class="form-error-text"></p>
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
const username = ref("");
const email = ref("");
const bio = ref("");
const profilePic = ref(null);
const password = ref("");
const confirmPassword = ref("");
let errors = reactive({});
const router = useRouter();
function handleFileUpload(e) {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    profilePic.value = selectedFile;
  }
}

async function handleSubmit() {
  if (
    username.value &&
    email.value &&
    password.value &&
    confirmPassword.value
  ) {
    if (
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      let formData = new FormData();
      formData.append("username", username.value);
      formData.append("email", email.value);
      formData.append("bio", bio.value);
      formData.append("profilePic", profilePic.value);
      formData.append("password", password.value);
      try {
        let { data } = await axios.post(`${apiUrl}/auth/signup`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
        toast.success(`Account created!`, {
          autoClose: 1000,
          position: "top-center",
          transition: "flip",
          dangerouslyHTMLString: true,
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err) {
        let errorElement = document.querySelector(".form-error-text");
        errorElement.style.display = "block";
        errorElement.innerHTML =
          "<i class='fa-solid fa-circle-exclamation'></i> username or email already exists";
      }
    } else {
      let errorElement = document.querySelector(".form-error-text");
      errorElement.style.display = "block";
      errorElement.innerHTML =
        "<i class='fa-solid fa-circle-exclamation'></i> Please fill in all fields correctly.";
    }
  } else {
    let errorElement = document.querySelector(".form-error-text");
    errorElement.style.display = "block";
    errorElement.innerHTML =
      "<i class='fa-solid fa-circle-exclamation'></i> Please fill in all fields.";
  }
}

function blurred(e) {
  let inputId = e.target.id;
  let inputValue = e.target.value;
  let errorElement = e.target.nextElementSibling;
  if (inputId === "username") {
    if (!/^[a-zA-Z0-9_]+$/.test(inputValue)) {
      errorElement.style.display = "block";
      errorElement.innerHTML =
        "<i class='fa-solid fa-circle-exclamation'></i> Username can only contain letters, numbers, and underscores";
      errors.username = true;
    } else {
      errorElement.style.display = "none";
      errors.username = false;
    }
  } else if (inputId === "email") {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue)) {
      errorElement.style.display = "block";
      errorElement.innerHTML =
        "<i class='fa-solid fa-circle-exclamation'></i> Please enter a valid email address";
      errors.email = true;
    } else {
      errorElement.style.display = "none";
      errors.email = false;
    }
  } else if (inputId === "password") {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(
        inputValue
      )
    ) {
      errorElement.style.display = "block";
      errorElement.innerHTML =
        "<i class='fa-solid fa-circle-exclamation'></i> Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      errors.password = true;
    } else {
      errorElement.style.display = "none";
      errors.password = false;
    }
  } else if (inputId === "confirm-password") {
    if (inputValue !== password.value) {
      errorElement.style.display = "block";
      errorElement.innerHTML =
        "<i class='fa-solid fa-circle-exclamation'></i> Passwords do not match";
      errors.confirmPassword = true;
    } else {
      errorElement.style.display = "none";
      errors.confirmPassword = false;
    }
  } else {
    errorElement.style.display = "none";
  }
}

function focused(e) {
  let inputId = e.target.id;
  let err = errors;
  let errorElement = e.target.nextElementSibling;
  if (err[inputId]) {
    errorElement.style.display = "none";
    e.target.value = "";
  }
}
</script>
