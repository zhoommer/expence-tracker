<script setup lang="ts">
import { computed, onMounted } from "vue";
import Layout from "./components/Layout.vue";
import { useThemeStore } from "./stores/theme/useThemeStore";
import { useUserStore } from "./stores/user/useUserStore";
import { useCategoriesStore } from "./stores/categories/useCategoriesStore";
import Skeleton from "./components/loader/Skeleton.vue";

const themeStore = useThemeStore();
const userStore = useUserStore();
const categoryStore = useCategoriesStore();

const isAuth = computed(() => userStore.isAuthenticated);

onMounted(() => {
  userStore.checkAuth();
  userStore.getMe();
  categoryStore.getOverlimitedExpenses();
});
</script>

<template>
  <v-theme-provider :theme="themeStore.mode">
    <Skeleton v-if="userStore.loading && categoryStore.loading" />
    <Layout :isAuth="isAuth" v-else />
  </v-theme-provider>
</template>
