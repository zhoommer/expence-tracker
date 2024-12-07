export interface AddExpense {
  name: string;
  categoryId: number | null;
  amount: number | null;
  price: number | null;
  currency: "USD" | "TRY";
}

export interface Expense {
  id: number;
  name: string;
  categoryId: number;
  category: string;
  amount: number;
  price: string;
  currency: "USD" | "TRY";
  createdAt: string;
  updatedAt: string;
}

export interface TotalExpenses {
  categoryId: string;
  categoryName: string;
  totalExpense: { TRY: string; USD: string };
}
