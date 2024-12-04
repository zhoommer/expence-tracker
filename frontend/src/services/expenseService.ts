import type {
  AddExpense,
  AddExpenseResponse,
} from "@/definations/expense.type";
import axiosClient from "./axiosIntance";

export class ExpenseService {
  private client = axiosClient;

  async create(data: AddExpense): Promise<AddExpenseResponse> {
    const response = await this.client.post<AddExpenseResponse>(
      "/expense/create",
      data,
    );
    return response.data;
  }
}
