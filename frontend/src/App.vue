<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useThemeStore } from "./stores/theme/useThemeStore";
import { useUserStore } from "./stores/user/useUserStore";
import { useCategoriesStore } from "./stores/categories/useCategoriesStore";
import { useChartStore } from "./stores/chart/useChartStore";
import Layout from "./components/Layout.vue";

const themeStore = useThemeStore();
const userStore = useUserStore();
const categoryStore = useCategoriesStore();
const chartStore = useChartStore();

const isAuth = computed(() => userStore.isAuthenticated);

onMounted(async () => {
  userStore.checkAuth();
  await userStore.getMe();
  await categoryStore.getOverlimitedExpenses();
  await categoryStore.getAll();
  await chartStore.getTotalExpensesByCategory();
});
</script>

<template>
  <v-theme-provider :theme="themeStore.mode">
    <Layout
      :isAuth="isAuth"
      :loading="
        userStore.loading || categoryStore.loading || chartStore.loading
      "
    />
  </v-theme-provider>
</template>
