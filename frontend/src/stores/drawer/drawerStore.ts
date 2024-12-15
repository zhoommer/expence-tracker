import { defineStore } from "pinia";

export const DrawerStore = defineStore("drawer", {
  state: () => ({
    drawer: false as boolean,
  }),
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
