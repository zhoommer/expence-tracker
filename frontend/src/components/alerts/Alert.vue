<template>
  <v-alert
    :color="alertStore.color"
    :icon="alertStore.icon"
    :title="alertStore.title"
    :text="alertStore.text"
    class="mt-16 me-5"
    position="absolute"
    location="top end"
  >
    <template v-slot:append>
      <v-btn icon="mdi-close" size="x-small" @click="alertStore.hideAlert()">
      </v-btn>
    </template>
  </v-alert>
</template>

<script setup lang="ts">
import { useAlertStore } from "@/stores/alert/useAlertStore";

const alertStore = useAlertStore();
</script>
