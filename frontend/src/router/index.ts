import { useUserStore } from "@/stores/user/useUserStore";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: import("@/views/auth/Login.vue"),
  },
  {
    path: "/",
    name: "Dashboard",
    component: import("@/views/dashboard/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: import("@/views/expenses/Expenses.vue"),
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
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
