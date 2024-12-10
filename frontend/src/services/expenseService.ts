import type {
  AddExpense,
  Expense,
  TotalExpenses,
} from "@/definations/expense.type";
import axiosClient from "./axiosIntance";
import type { OverLimitedExpensesByCategory } from "@/definations/categories.type";

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
}
