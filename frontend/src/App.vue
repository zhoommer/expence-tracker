<script setup lang="ts">
import Layout from "./components/Layout.vue";
import { useThemeStore } from "./stores/theme/useThemeStore";

const themeStore = useThemeStore();
</script>

<template>
  <v-theme-provider :theme="themeStore.mode">
    <Layout />
  </v-theme-provider>
</template>
