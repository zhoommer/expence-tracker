<template>
  <v-navigation-drawer
    :expand-on-hover="$vuetify.display.mobile ? false : true"
    :location="$vuetify.display.mobile ? 'bottom' : 'left'"
    :permanent="drawerStore.drawer"
    :color="themeStore.color"
    rail
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :title="userStore.fullName"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        :prepend-icon="item.icon"
        :title="$t(item.title)"
        :value="item"
        :to="item.to"
        active-color="surface"
      ></v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-logout"
          :title="$t('logout')"
          value="logout"
          @click="logout"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDrawerStore } from "@/stores/drawer/useDrawerStore";
import { useThemeStore } from "@/stores/theme/useThemeStore";
import { useUserStore } from "@/stores/user/useUserStore";
import { menu } from "./Menu";
import { useRouter } from "vue-router";

const drawerStore = useDrawerStore();
const themeStore = useThemeStore();
const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  await userStore.logout();
  router.push("/auth");
};
</script>
