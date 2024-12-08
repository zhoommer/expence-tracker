<template>
  <v-alert
    :color="alertStore.color"
    :icon="alertStore.icon"
    :title="alertStore.title"
    :text="alertStore.text"
    :variant="themeStore.variant"
    class="mt-16 me-5 bounce"
    position="absolute"
    location="top end"
    style="z-index: 9999"
  >
    <template v-slot:append>
      <v-btn icon="mdi-close" size="x-small" @click="alertStore.hideAlert()">
      </v-btn>
    </template>
  </v-alert>
</template>

<script setup lang="ts">
import { useAlertStore } from "@/stores/alert/useAlertStore";
import { useThemeStore } from "@/stores/theme/useThemeStore";

const alertStore = useAlertStore();
const themeStore = useThemeStore();
</script>
