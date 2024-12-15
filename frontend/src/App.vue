<script setup lang="ts">
import { computed } from "vue";
import { ThemeStore } from "./stores/theme/themeStore";
import { UserStore } from "./stores/user/userStore";
import Layout from "./components/Layout.vue";

const themeStore = ThemeStore();
const userStore = UserStore();

const isAuth = computed(() => userStore.isAuthenticated);
</script>

<template>
  <v-theme-provider :theme="themeStore.mode">
    <Layout :isAuth="isAuth" />
  </v-theme-provider>
</template>
