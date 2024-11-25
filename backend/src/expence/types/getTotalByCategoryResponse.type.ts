export type Response = {
  categoryId: number;
  categoryName: string;
  totalAmount: number;
  spendingLimit: number | null;
  exeedsLimit: boolean;
};
