<script setup lang="ts">
import LoginForm from "@/components/forms/LoginForm.vue";
import { useThemeStore } from "@/stores/theme/useThemeStore";

const themeStore = useThemeStore();
</script>

<template>
  <v-container fluid height="100%">
    <v-row justify="center" align="center" style="height: 100%">
      <v-col cols="12" lg="5" class="border ma-5">IMAGE</v-col>
      <v-col
        cols="12"
        lg="5"
        class="border border-lg rounded-lg pa-16 ma-5 h-100"
        :class="
          themeStore.mode === 'dark' ? 'bg-grey-darken-4' : 'bg-grey-lighten-4'
        "
      >
        <h1 class="text-center mb-16">LOGIN</h1>
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>
