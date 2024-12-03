<template>
  <v-app-bar title="EXPENSE TRACKER" :elevation="5" :color="themeStore.color">
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

      <v-btn-toggle
        v-model="langStore.locale"
        class="ms-5"
        variant="plain"
        mandatory
        rounded
      >
        <v-btn
          color="red"
          value="tr"
          size="small"
          @click="changeLanguage('tr')"
        >
          <v-img :src="tr" alt="tr" width="30" height="30"></v-img>
        </v-btn>
        <v-btn
          color="blue"
          value="en"
          size="small"
          @click="changeLanguage('en')"
        >
          <v-img :src="us" alt="us" width="25" height="25"></v-img>
        </v-btn>
      </v-btn-toggle>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useDrawerStore } from "@/stores/drawer/useDrawerStore";
import { useLangStore } from "@/stores/lang/useLangStore";
import { watch } from "vue";
import tr from "@/assets/turkey.png";
import us from "@/assets/usa.png";

const themeStore = useThemeStore();
const drawerStore = useDrawerStore();
const langStore = useLangStore();

function changeLanguage(lang: "en" | "tr") {
  langStore.changeLang(lang);
  window.location.reload();
}

watch(
  () => themeStore.mode,
  (newTheme) => {
    localStorage.setItem("theme", newTheme === "light" ? "light" : "dark");
  },
);

watch(
  () => langStore.locale,
  (newLang) => {
    localStorage.setItem("lang", newLang === "tr" ? "tr" : "en");
  },
);
</script>
