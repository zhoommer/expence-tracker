"use client";
import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Toolbar, IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useDrawer } from "@/providers/drawer";
import AccountMenu from "../account-menu/account-menu";
import Switches from "../switches/switches";
import Image from "next/image";
import logo from "../../../../public/logo.png";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default function AppBarUI() {
  const { open, toggleDrawer } = useDrawer();
  const { token } = useDrawer();

  return (
    <>
      <div className="shadow-lg">
        <AppBar position="fixed" open={open}>
          <Toolbar className="flex">
            {token && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                sx={[
                  {
                    marginRight: 5,
                  },
                  open && { display: "none" },
                ]}
              >
                <Menu />
              </IconButton>
            )}
            <div className="flex justify-between items-center flex-grow">
              <Typography
                variant="h6"
                noWrap
                component="div"
                className="flex gap-5 items-center"
              >
                <Image
                  src={logo}
                  alt="logo"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                Expence Tracker
              </Typography>

              <div className="flex items-center">
                <AccountMenu />
                <Switches />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
