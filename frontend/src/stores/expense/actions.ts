import { ExpenseService } from "@/api/services/expenseService";
import { ExpenseStore } from "./expenseStore";
import { ChartStore } from "@/stores/chart/chartStore";
import type { AddExpense } from "@/types/api/Expense";

export const addExpense = async (data: AddExpense) => {
  const chartStore = ChartStore();
  const client = new ExpenseService();
  try {
    const response = await client.create(data);
    ExpenseStore().expenses?.push(response.data);
    await chartStore.getTotalExpensesByCategory();
  } catch (error) {
    ExpenseStore().error = "An error occurred while recording the expense.";
  }
};

export const getAllExpenses = async (
  query?: string,
  currency?: string,
  page?: number,
  limit?: number,
) => {
  const client = new ExpenseService();
  try {
    const response = await client.getAll(query, currency, page, limit);
    ExpenseStore().expenses = response.data;
    ExpenseStore().totalElements = response.totalElements;
  } catch (error) {
    ExpenseStore().error = "An error occurred while fetching expenses.";
  }
};
