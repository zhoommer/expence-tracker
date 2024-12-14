import { defineStore } from "pinia";
import { ExpenseService } from "@/services/expenseService";
import { useAlertStore } from "../alert/useAlertStore";

export const useDeleteDialogStore = defineStore("deleteDialog", {
  state: () => ({
    dialog: false,
    expenseId: null as number | null,
  }),

  actions: {
    showDialog(id: number | null) {
      this.dialog = true;
      this.expenseId = id;
    },

    closeDialog() {
      this.dialog = false;
      this.expenseId = null;
    },

    async delete() {
      const expenseService = new ExpenseService();
      const alertStore = useAlertStore();
      try {
        await expenseService.deleteExpense(this.expenseId);
        alertStore.success({
          title: "",
          text: "Expense deleted succcessfully",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
