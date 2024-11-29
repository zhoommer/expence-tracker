interface Menu {
  icon: string;
  title: string;
  to: string;
}

export const menu: Menu[] = [
  { icon: "mdi-view-dashboard", title: "Dashboard", to: "/" },
  { icon: "mdi-cash-multiple", title: "Expenses", to: "/expenses" },
];
