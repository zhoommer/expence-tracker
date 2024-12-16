import { ExpenseService } from "@/api/services/expenseService";
import { ExpenseAlertMessages } from "@/utils/alertMessages/expense/alertExpenseMessages";
import { ExpenseStore } from "./expenseStore";
import { AlertStore } from "../alert/alertStore";
import { ChartStore } from "@/stores/chart/chartStore";
import type { AddExpense } from "@/types/api/Expense";

export const addExpense = async (data: AddExpense) => {
  const alertStore = AlertStore();
  const chartStore = ChartStore();
  const client = new ExpenseService();
  const expenseAlertMessages = new ExpenseAlertMessages();
  try {
    const response = await client.create(data);
    await alertStore.success({
      title: "",
      text: expenseAlertMessages.successAddExpense(),
    });
    ExpenseStore().expenses?.push(response.data);
    await chartStore.getTotalExpensesByCategory();
  } catch (error) {
    ExpenseStore().error = "An error occurred while recording the expense.";
  }
};

export const getAllExpenses = async (
  query?: string,
  page?: number,
  limit?: number,
) => {
  const client = new ExpenseService();
  try {
    const response = await client.getAll(query, page, limit);
    ExpenseStore().expenses = response.data;
    ExpenseStore().totalElements = response.totalElements;
  } catch (error) {
    ExpenseStore().error = "An error occurred while fetching expenses.";
  }
};
