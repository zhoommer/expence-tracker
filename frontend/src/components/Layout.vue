<script setup lang="ts">
import Appbar from "./appbar/Appbar.vue";
import Drawer from "./drawer/Drawer.vue";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { ref } from "vue";

const themeStore = useThemeStore();

const show = ref(false);
</script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <Appbar />

      <Drawer />
      <v-main>
        <v-container fluid class="border rounded-lg" height="100%">
          <RouterView />
          <v-tooltip v-model="show" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                :variant="themeStore.mode === 'light' ? 'flat' : 'tonal'"
                :color="themeStore.color"
                icon="mdi-plus"
                size="large"
                position="absolute"
                location="bottom end"
                class="ma-16"
              ></v-btn>
            </template>
            <span>Add Expense</span>
          </v-tooltip>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
