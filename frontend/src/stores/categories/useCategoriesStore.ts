import type { Categories } from "@/definations/categories.type";
import axiosClient from "@/services/axiosIntance";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [] as Categories[] | [],
    loading: false as boolean,
    error: null as string | null,
  }),

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
