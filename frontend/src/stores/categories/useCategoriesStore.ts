import type {
  Categories,
  OverLimitedExpensesByCategory,
} from "@/definations/categories.type";
import type { TotalExpenses } from "@/definations/expense.type";
import axiosClient from "@/services/axiosIntance";
import { ExpenseService } from "@/services/expenseService";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [] as Categories[] | [],
    totalExpenses: [] as TotalExpenses[],
    overLimitedExpenses: [] as OverLimitedExpensesByCategory[],
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    labels: (state) => {
      state.totalExpenses.map((expense) => expense.categoryName);
    },
    datasets: (state) =>
      state.totalExpenses.map((expense) => expense.totalExpense),

    limitTRY: (state): number[] => {
      return state.overLimitedExpenses.map(
        (expense) => expense.overLimitedExpensesTRY.limit,
      );
    },
    limitUSD: (state): number[] => {
      return state.overLimitedExpenses.map(
        (expense) => expense.overLimitedExpensesUSD.limit,
      );
    },
    spendingTRY: (state): number[] => {
      return state.overLimitedExpenses.map(
        (expense) => expense.overLimitedExpensesTRY.totalSpentTRY,
      );
    },
    spendingUSD: (state): number[] => {
      return state.overLimitedExpenses.map(
        (expense) => expense.overLimitedExpensesUSD.totalSpentUSD,
      );
    },
  },

  actions: {
    async getAll() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosClient.get("/categories/get-all");
        this.categories = response.data.data;
      } catch (error) {
        this.error = "An error occurred while fetching categories";
      } finally {
        this.loading = false;
      }
    },

    async getOverlimitedExpenses() {
      const client = new ExpenseService();
      this.loading = true;
      this.error = null;
      try {
        const response = await client.getOverlimitedExpensesByCategory();
        this.overLimitedExpenses = response;
      } catch (error) {
        this.error = "An error occurred while fething over limited expenses";
      } finally {
        this.loading = false;
      }
    },
  },
});
