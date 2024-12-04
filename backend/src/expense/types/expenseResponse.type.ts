import { Expense } from "./expense.type";

export type ExpenseResponse = {
  message: string;
  data: Expense;
};
