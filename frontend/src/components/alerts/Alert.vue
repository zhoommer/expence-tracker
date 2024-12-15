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
import { AlertStore } from "@/stores/alert/alertStore";
import { ThemeStore } from "@/stores/theme/themeStore";

const alertStore = AlertStore();
const themeStore = ThemeStore();
</script>
