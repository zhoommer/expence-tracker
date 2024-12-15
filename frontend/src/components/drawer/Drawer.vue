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
        :subtitle="userStore.user?.email"
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
import { DrawerStore } from "@/stores/drawer/drawerStore";
import { ThemeStore } from "@/stores/theme/themeStore";
import { UserStore } from "@/stores/user/userStore";
import { menu } from "./Menu";
import { useRouter } from "vue-router";

const drawerStore = DrawerStore();
const themeStore = ThemeStore();
const userStore = UserStore();
const router = useRouter();

const logout = async () => {
  await userStore.logout();
  router.push("/auth");
};
</script>
