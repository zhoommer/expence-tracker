<template>
  <v-app-bar
    :title="$t('expense tracker')"
    :elevation="5"
    :color="themeStore.color"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.mobile"
        @click="drawerStore.toggleDrawer()"
      ></v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
      <v-switch
        v-model="themeStore.mode"
        hide-details
        inset
        true-value="dark"
        false-value="light"
        false-icon="mdi-white-balance-sunny"
        true-icon="mdi-moon-waning-crescent"
        :color="themeStore.mode === 'dark' ? '#121212' : 'primary'"
      ></v-switch>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useDrawerStore } from "@/stores/drawer/useDrawerStore";
import { watch } from "vue";

const themeStore = useThemeStore();
const drawerStore = useDrawerStore();

watch(
  () => themeStore.mode,
  (newTheme) => {
    localStorage.setItem("theme", newTheme === "light" ? "light" : "dark");
  },
);
</script>
