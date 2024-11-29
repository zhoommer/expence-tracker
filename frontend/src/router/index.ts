import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: import("@/views/dashboard/Dashboard.vue"),
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: import("@/views/expenses/Expenses.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
