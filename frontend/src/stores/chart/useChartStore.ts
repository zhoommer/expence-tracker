import { defineStore } from "pinia";
import { ExpenseService } from "@/services/expenseService";

export const useChartStore = defineStore("chart", {
  state: () => ({
    labels: [""] as string[],
    dataTRY: [] as number[],
    dataUSD: [] as number[],
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#C9CBCF",
      "#6C757D",
      "#FFD700",
      "#FF4500",
      "#6495ED",
      "#FFB6C1",
      "#A9A9A9",
    ],
    loading: false as boolean,
    error: null as string | null,
  }),

  actions: {
    async getTotalExpensesByCategory() {
      const client = new ExpenseService();
      this.loading = true;
      this.error = null;
      try {
        const response = await client.getTotalExpensesByCategory();
        this.labels = response.data.map((expense) => expense.categoryName);
        this.dataTRY = response.data.map((expense) => expense.totalExpense.TRY);
        this.dataUSD = response.data.map((expense) => expense.totalExpense.USD);
      } catch (error) {
        this.error =
          "An error occurred while fetching total expenses by category";
      } finally {
        this.loading = false;
      }
    },
  },
});
