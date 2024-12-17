<template>
  <v-navigation-drawer
    :expand-on-hover="$vuetify.display.mobile ? false : true"
    :location="$vuetify.display.mobile ? 'bottom' : 'left'"
    :permanent="drawerStore.drawer"
    :color="themeStore.color"
    rail
  >
    <v-list>
      <ProfileDialog />
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
import { useRouter } from "vue-router";
import { ref } from "vue";
import ProfileDialog from "../features/profile/ProfileDialog.vue";

const drawerStore = DrawerStore();
const themeStore = ThemeStore();
const userStore = UserStore();
const router = useRouter();

const show = ref<boolean>(false);

async function handleClickAvatar() {
  await userStore.getMe();
  show.value = true;
}

const user: { name: string; surname: string; email: string } | null =
  JSON.parse(localStorage.getItem("user") || "");

interface Menu {
  icon: string;
  title: string;
  to: string;
}

const menu: Menu[] = [
  { icon: "mdi-view-dashboard", title: "dashboard", to: "/" },
  {
    icon: "mdi-cash-multiple",
    title: "expenses",
    to: "/expenses?query=&currency=&page=1&limit=5",
  },
];

const logout = async () => {
  await userStore.logout();
  router.push("/auth");
};
</script>
