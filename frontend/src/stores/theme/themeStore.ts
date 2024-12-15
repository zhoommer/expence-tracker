import { defineStore } from "pinia";

export const ThemeStore = defineStore("theme", {
  state: () => ({
    mode: localStorage.getItem("theme") === "light" ? "light" : "dark",
  }),
  actions: {
    toggleMode() {
      localStorage.setItem("theme", this.mode === "light" ? "light" : "dark");
    },
  },
  getters: {
    color: (state) => {
      return state.mode === "light" ? "primary" : "warning";
    },
    variant: (state) => {
      return state.mode === "light" ? "flat" : "tonal";
    },
  },
});
