import { defineStore } from "pinia";

export const useExpenseStore = defineStore("expense", {
  state: () => ({
    dialog: false as boolean,
  }),

  actions: {
    showDialog() {
      this.dialog = true;
    },
  },
});
