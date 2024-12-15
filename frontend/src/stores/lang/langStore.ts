import { defineStore } from "pinia";

export const LangStore = defineStore("lang", {
  state: () => ({
    locale: localStorage.getItem("lang") === "tr" ? "tr" : "en",
  }),

  actions: {
    changeLang(lang: "en" | "tr") {
      this.locale = lang;
    },
  },
});
