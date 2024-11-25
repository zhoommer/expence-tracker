"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarUI from "./ui/appbar/appbar";
import DrawerUI, { DrawerHeader } from "./ui/drawer/drawer";

interface Props {
  children: React.ReactNode;
}

export default function MiniDrawer(props: Props) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarUI />
      <DrawerUI />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
