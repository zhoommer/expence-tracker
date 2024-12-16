export interface Categories {
  id: number;
  name: string;
}

export interface OverLimitedExpensesByCategory {
  overLimitedExpensesTRY: {
    categoryName: string;
    limit: number;
    totalSpentTRY: number;
    isLimitExeeded: boolean;
  };

  overLimitedExpensesUSD: {
    categoryName: string;
    limit: number;
    totalSpentUSD: number;
    isLimitExeeded: boolean;
  };
}
