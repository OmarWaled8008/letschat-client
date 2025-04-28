import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
const NotFound = () => import("../views/NotFound.vue");
const Login = () => import("../views/Login.vue");
const Signup = () => import("../views/Signup.vue");
const Layout = () => import("../views/Layout.vue");
const Home = () => import("../views/Home.vue");

let routes = [
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    component: Signup,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/home",
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: "/conversations",
        component: () => import("../views/Conversations.vue"),
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            component: () => import("../components/Warn.vue"),
            meta: { requiresAuth: true },
          },
          {
            path: ":chatId",
            component: () => import("../components/Chat.vue"),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: "/follow",
        component: () => import("../views/Friends.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "vue-router-active",
  linkExactActiveClass: "vue-router-active-exact",
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ path: "/login" });
  }

  next();
});

export default router;
