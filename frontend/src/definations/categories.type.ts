export interface Categories {
  id: number;
  name: string;
}

export interface OverLimitedExpensesByCategory {
  categoryName: string;
  limit: number;
  totalSpent: number;
  isLimitExeeded: boolean;
}
