<script setup lang="ts">
import { computed, onMounted } from "vue";
import Layout from "./components/Layout.vue";
import { useThemeStore } from "./stores/theme/useThemeStore";
import { useUserStore } from "./stores/user/useUserStore";

const themeStore = useThemeStore();
const userStore = useUserStore();

const isAuth = computed(() => userStore.isAuthenticated);

onMounted(() => {
  userStore.checkAuth();
  userStore.getMe();
});
</script>

<template>
  <v-theme-provider :theme="themeStore.mode">
    <Layout :isAuth="isAuth" />
  </v-theme-provider>
</template>
