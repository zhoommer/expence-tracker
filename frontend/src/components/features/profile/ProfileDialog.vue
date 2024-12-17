<script setup lang="ts">
import { UserStore } from "@/stores/user/userStore";
import { ThemeStore } from "@/stores/theme/themeStore";
import { reactive } from "vue";

const userStore = UserStore();
const themeStore = ThemeStore();
const user = JSON.parse(localStorage.getItem("user") || "");

const userData = reactive({
  firstname: user?.name,
  lastname: user?.surname,
  phone: user?.phone,
  birthDate: user?.birthDate,
});
</script>

<template>
  <v-dialog max-width="400">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item
        v-bind="activatorProps"
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :title="user?.name + ' ' + user?.surname"
        :subtitle="user?.email"
      ></v-list-item>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card
        v-show="userStore.userDialog"
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        class="pa-5"
      >
        <v-text-field
          v-model="userData.firstname"
          :label="$t('name')"
          :color="themeStore.color"
          variant="solo-filled"
          density="compact"
        ></v-text-field>
        <v-text-field
          v-model="userData.lastname"
          :label="$t('surname')"
          :color="themeStore.color"
          variant="solo-filled"
          density="compact"
        ></v-text-field>
        <v-text-field
          v-model="userData.phone"
          :label="$t('phoneNumber')"
          type="tel"
          :color="themeStore.color"
          variant="solo-filled"
          density="compact"
        ></v-text-field>
        <v-text-field
          v-model="userData.birthDate"
          type="date"
          :label="$t('birthDate')"
          variant="solo-filled"
          density="compact"
        ></v-text-field>

        <v-btn
          text="Guncelle"
          variant="outlined"
          :color="themeStore.color"
        ></v-btn>
      </v-card>
    </template>
  </v-dialog>
</template>
