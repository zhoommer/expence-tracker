interface Menu {
  icon: string;
  title: string;
  to: string;
}

export const menu: Menu[] = [
  { icon: "mdi-view-dashboard", title: "dashboard", to: "/" },
  {
    icon: "mdi-cash-multiple",
    title: "expenses",
    to: "/expenses?query=&page=1&limit=5",
  },
];
