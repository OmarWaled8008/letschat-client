# Vue 3 Social Media Web App

A modern social media web application built with **Vue 3**, **Vite**, **Pinia**, **Socket.IO**, and **Axios**. This app enables users to sign up, log in, view and create posts, like and comment on posts, chat in real-time, and follow/unfollow other users.

---

## 📊 Features

- User Authentication (JWT-based, stored in cookies)
- Protected Routing (Vue Router guards)
- Timeline Feed (Posts with likes, comments, images)
- Real-Time Chatting (Socket.IO integration)
- Follow and Unfollow Users (Friends Management)
- Responsive Design (Mobile-friendly UI)
- Light Mode and Dark Mode
- Toast Notifications for User Feedback

---

## 🔧 Technology Stack

| Category              | Technology                       |
| :-------------------- | :------------------------------- |
| Frontend Framework    | Vue 3 (Composition API)           |
| Build Tool            | Vite                             |
| State Management      | Pinia                            |
| Routing               | Vue Router                       |
| Real-Time Communication | Socket.IO Client               |
| API Requests          | Axios                            |
| Styling               | SCSS compiled to CSS             |
| Authentication        | JWT Tokens with Cookies          |
| Notifications         | Vue3-Toastify                    |
| Icons                 | FontAwesome                      |

---

## 👁‍🗨️ Project Structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/          # Chat, Warn components
│   ├── router/
│   │   └── router.js         # Application routes
│   ├── stores/
│   │   ├── chatStore.js      # Chat data management
│   │   ├── postStore.js      # Post timeline management
│   │   └── userStore.js      # User, followers, suggestions
│   ├── views/
│   │   ├── Conversations.vue
│   │   ├── Friends.vue
│   │   ├── Home.vue
│   │   ├── Layout.vue
│   │   ├── Login.vue
│   │   ├── NotFound.vue
│   │   └── Signup.vue
│   ├── App.vue
│   ├── main.js
│   ├── main.css
│   ├── main.scss
│   ├── socket.js
│   └── apis/host.js          # Backend API base URL
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

> The app will run at `http://localhost:5173/`

**Note:** Ensure your backend server (Socket.IO + API) is running at `http://localhost:8080/`.

### 4. Build for Production

```bash
npm run build
```

---

## 🔗 Authentication Flow
- Users must register or login to access the protected pages.
- Authentication status is checked via JWT token stored in cookies.
- Protected routes automatically redirect unauthenticated users to `/login`.

---

## 💬 Real-Time Chat
- Socket.IO Client connects to `http://localhost:8080`.
- Users can start private chats.
- New messages appear instantly without refreshing.

---

## 👨‍💬 Social Interactions
- Users can follow and unfollow others.
- See lists of followers and following.
- Discover new people via Suggestions.

---

## 📨 Posts and Timeline
- Create new posts with optional images.
- Like/unlike posts.
- Comment on posts.
- View timeline updates dynamically.

---

## 📉 Environment Variables (Optional)

If you wish to manage API URL dynamically, you can create a `.env` file:

```
VITE_API_URL=http://localhost:8080
```

And adjust your `apiUrl` import accordingly.

---

## 👻 Known Issues / To-Do
- [ ] Proper handling of Socket.IO disconnect/reconnect.
- [ ] Upload optimization for large images.
- [ ] Better error handling for Axios requests.

---

## ✨ License

This project is open-source and available for free under the [MIT License](LICENSE).

---

## 👤 Author

- **Omar Waled**
- [Your LinkedIn](https://www.linkedin.com/in/omar-waled/)
---

_Thank you for checking out this project!_ ✨

Feel free to contribute, report issues, or suggest enhancements!

