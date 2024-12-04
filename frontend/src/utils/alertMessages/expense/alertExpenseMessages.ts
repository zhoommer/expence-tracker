export class ExpenseAlertMessages {
  readonly lang = localStorage.getItem("lang");

  successAddExpense() {
    if (!!this.lang)
      return this.lang === "en"
        ? "Your expense has been added successfully."
        : "Harcamanız başarıyla eklendi.";
  }
}
