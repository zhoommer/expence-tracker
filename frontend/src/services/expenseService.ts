import type { AddExpense, Expense } from "@/definations/expense.type";
import axiosClient from "./axiosIntance";

export class ExpenseService {
  private client = axiosClient;

  async create(data: AddExpense): Promise<{ message: string; data: Expense }> {
    const response = await this.client.post<{ message: string; data: Expense }>(
      "/expense/create",
      data,
    );
    return response.data;
  }

  async getAll(): Promise<{ message: string; data: Expense[] }> {
    const response = await this.client.get<{
      message: string;
      data: Expense[];
    }>("/expense/get-all");
    return response.data;
  }
}
