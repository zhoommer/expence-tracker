import { createRouter, createWebHistory } from "vue-router";
import { UserStore } from "@/stores/user/userStore";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: import("@/views/auth/AuthLayout.vue"),
  },
  {
    path: "/",
    name: "Dashboard",
    component: import("@/views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: import("@/views/Expenses.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = UserStore();
  if (to.meta.requiresAuth && !userStore.token) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
