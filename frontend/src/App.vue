<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "./stores/theme/useThemeStore";
import { useUserStore } from "./stores/user/useUserStore";
import Layout from "./components/Layout.vue";

const themeStore = useThemeStore();
const userStore = useUserStore();

const isAuth = computed(() => userStore.isAuthenticated);
</script>

<template>
  <v-theme-provider :theme="themeStore.mode">
    <Layout :isAuth="isAuth" />
  </v-theme-provider>
</template>
