import { defineStore } from "pinia";
import { ExpenseService } from "@/services/expenseService";
import { useAlertStore } from "../alert/useAlertStore";
import type { AddExpense, Expense } from "@/definations/expense.type";
import { ExpenseAlertMessages } from "@/utils/alertMessages/expense/alertExpenseMessages";

export const useExpenseStore = defineStore("expense", {
  state: () => ({
    expenses: null as Expense[] | null,
    dialog: false as boolean,
    loading: false as boolean,
    error: null as string | null,
  }),

  actions: {
    showDialog() {
      this.dialog = true;
    },

    async addExpense(data: AddExpense) {
      const alertStore = useAlertStore();
      const client = new ExpenseService();
      const expenseAlertMessages = new ExpenseAlertMessages();
      try {
        const response = await client.create(data);
        await alertStore.success({
          title: "",
          text: expenseAlertMessages.successAddExpense(),
        });
        this.expenses?.push(response.data);
      } catch (error) {
        this.error = "An error occurred while recording the expense.";
      }
    },

    async getAllExpenses() {
      const client = new ExpenseService();
      try {
        const response = await client.getAll();
        this.expenses = response.data;
      } catch (error) {
        this.error = "An error occurred while fetching expenses.";
      }
    },
  },
});
