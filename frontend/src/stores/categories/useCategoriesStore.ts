import type { Categories } from "@/definations/categories.type";
import type { TotalExpenses } from "@/definations/expense.type";
import axiosClient from "@/services/axiosIntance";
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
      state.totalExpenses.map((expense) => expense.totalExpense),
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
  },
});
