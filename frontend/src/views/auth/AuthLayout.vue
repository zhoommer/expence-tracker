<template>
  <v-card
    :theme="themeStore.mode"
    height="100%"
    :width="$vuetify.display.mobile ? '100%' : '50%'"
    location="center"
    :class="$vuetify.display.mobile ? '' : 'pa-16'"
  >
    <v-tabs v-model="tab" align-tabs="center" :color="themeStore.color">
      <v-tab :value="'login'">Login</v-tab>
      <v-tab :value="'register'">Register</v-tab>
    </v-tabs>

    <v-tabs-window
      v-model="tab"
      :class="$vuetify.display.mobile ? '' : 'pa-10'"
    >
      <v-tabs-window-item :value="'login'">
        <v-container class="d-flex justify-center items-center w-50 mt-16">
          <Login />
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :value="'register'">
        <v-container class="d-flex justify-center items-center">
          <Register />
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import Login from "./Login.vue";
import Register from "./Register.vue";

const themeStore = useThemeStore();
const tab = ref(null);
</script>
