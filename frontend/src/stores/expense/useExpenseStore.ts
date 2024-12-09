import { defineStore } from "pinia";
import { useAlertStore } from "../alert/useAlertStore";
import { ExpenseService } from "@/services/expenseService";
import type { AddExpense, Expense } from "@/definations/expense.type";
import { ExpenseAlertMessages } from "@/utils/alertMessages/expense/alertExpenseMessages";
import { useChartStore } from "../chart/useChartStore";

export const useExpenseStore = defineStore("expense", {
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

    async addExpense(data: AddExpense) {
      const alertStore = useAlertStore();
      const chartStore = useChartStore();
      const client = new ExpenseService();
      const expenseAlertMessages = new ExpenseAlertMessages();
      try {
        const response = await client.create(data);
        await alertStore.success({
          title: "",
          text: expenseAlertMessages.successAddExpense(),
        });
        this.expenses?.push(response.data);
        await chartStore.getTotalExpensesByCategory();
      } catch (error) {
        this.error = "An error occurred while recording the expense.";
      }
    },

    async getAllExpenses(query?: string, page?: number, limit?: number) {
      const client = new ExpenseService();
      try {
        const response = await client.getAll(query, page, limit);
        this.expenses = response.data;
        this.totalElements = response.totalElements;
      } catch (error) {
        this.error = "An error occurred while fetching expenses.";
      }
    },
  },
});
