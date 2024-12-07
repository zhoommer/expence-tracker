import type { Categories } from "@/definations/categories.type";
import type { TotalExpenses } from "@/definations/expense.type";
import axiosClient from "@/services/axiosIntance";
import { ExpenseService } from "@/services/expenseService";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [] as Categories[] | [],
    totalExpenses: [] as TotalExpenses[],
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    labels: (state) => {
      state.totalExpenses.map((expense) => expense.categoryName);
    },
    datasets: (state) =>
      state.totalExpenses.map((expense) => expense.totalExpense.TRY),
  },

  actions: {
    async getAll() {
      try {
        const response = await axiosClient.get("/categories/get-all");
        this.categories = response.data.data;
      } catch (error) {
        this.error = "An error occurred while fetching categories";
      }
    },

    async getTotalExpensesByCategory() {
      const client = new ExpenseService();
      this.loading = true;
      this.error = null;
      try {
        const response = await client.getTotalExpensesByCategory();
        this.totalExpenses = response.data;
      } catch (error) {
        this.error =
          "An error occurred while fetching total expenses by category";
      } finally {
        this.loading = false;
      }
    },
  },
});
