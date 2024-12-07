interface Data {
  categoryId: number;
  categoryName: string;
  totalExpense: { TRY: number; USD: number };
}

export interface TotalExpensesByCategory {
  message: string;
  data: Data[];
}
