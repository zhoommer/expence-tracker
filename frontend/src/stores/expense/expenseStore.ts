import { defineStore } from "pinia";
import type { Expense } from "@/definations/expense.type";

export const ExpenseStore = defineStore("expense", {
  state: () => ({
    expenses: null as Expense[] | null,
    cursor: null as number | null,
    totalElements: null as number | null,
    dialog: false as boolean,
    loading: false as boolean,
    error: null as string | null,
  }),

  actions: {
    showDialog() {
      this.dialog = true;
    },
  },
});
