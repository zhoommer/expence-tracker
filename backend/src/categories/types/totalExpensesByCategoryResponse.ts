interface Data {
  categoryId: number;
  categoryName: string;
  totalExpense: { TRY: string; USD: string };
}

export interface TotalExpensesByCategory {
  message: string;
  data: Data[];
}
