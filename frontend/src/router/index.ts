import { useUserStore } from "@/stores/user/useUserStore";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: import("@/views/auth/AuthLayout.vue"),
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
    next("/auth");
  } else {
    next();
  }
});

export default router;
