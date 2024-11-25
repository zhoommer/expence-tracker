import {
  CurrencyExchangeOutlined,
  SpaceDashboardOutlined,
} from "@mui/icons-material";

interface Menu {
  path: string;
  name: string;
  icon: React.ReactNode;
}

export const Menu: Menu[] = [
  { path: "/dashboard", name: "Dashboard", icon: <SpaceDashboardOutlined /> },
  { path: "/expense", name: "Expense", icon: <CurrencyExchangeOutlined /> },
];
