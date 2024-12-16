import axiosClient from "../axios";
import type { Expense, AddExpense, TotalExpenses } from "@/types/api/Expense";
import type { OverLimitedExpensesByCategory } from "@/types/api/Categories";

export class ExpenseService {
  private client = axiosClient;

  async create(data: AddExpense): Promise<{ message: string; data: Expense }> {
    const response = await this.client.post<{ message: string; data: Expense }>(
      "/expense/create",
      data,
    );
    return response.data;
  }

  async getAll(
    query?: string,
    currency?: string,
    page?: number | null,
    limit?: number | null,
  ): Promise<{
    message: string;
    data: Expense[];
    totalElements: number;
  }> {
    const queryParams = {
      params: {
        query: query ? query : "",
        currency: currency,
        page: page ? page : 1,
        limit: limit ? limit : 5,
      },
    };
    const response = await this.client.get<{
      message: string;
      data: Expense[];
      totalElements: number;
    }>("/expense/get-all", queryParams);
    return response.data;
  }

  async getTotalExpensesByCategory(): Promise<{
    message: string;
    data: TotalExpenses[];
  }> {
    const response = await this.client.get<{
      message: string;
      data: TotalExpenses[];
    }>("/categories/get-total-expenses-by-category");
    return response.data;
  }

  async getOverlimitedExpensesByCategory(): Promise<
    OverLimitedExpensesByCategory[]
  > {
    const response = await this.client.get<OverLimitedExpensesByCategory[]>(
      "/categories/check-expenses",
    );
    return response.data;
  }

  async deleteExpense(id: number | null) {
    const response = await this.client.delete(`/expense/delete/${id}`);
    return response.data;
  }
}
