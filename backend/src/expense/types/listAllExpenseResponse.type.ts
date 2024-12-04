import { Expense } from "./expense.type";

export type ListAllResponse = {
  message: string;
  data: Expense[];
};
