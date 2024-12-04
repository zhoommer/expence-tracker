export interface AddExpense {
  name: string;
  categoryId: number | null;
  amount: number | null;
  price: number | null;
}

export interface Expense {
  name: string;
  categoryId: number;
  userId: number;
  amount: number;
  price: number;
}

export interface AddExpenseResponse {
  message: string;
  data: Expense[];
}
