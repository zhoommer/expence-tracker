import { defineStore } from "pinia";

export const useLangStore = defineStore("lang", {
  state: () => ({
    locale: localStorage.getItem("lang") === "tr" ? "tr" : "en",
  }),

  actions: {
    changeLang(lang: "en" | "tr") {
      this.locale = lang;
    },
  },
});
