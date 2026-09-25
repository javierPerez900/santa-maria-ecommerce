"use client";
import { useState } from "react";
import { BasicLayout } from "../components/Layouts";
import { Container, Tabs, Tab, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Separator } from "../components/Shared";
import { Settings, Address, Orders } from "@/app/components/Account";
import { useAuth } from "@/hooks";

export default function AccountPage() {
  const [reload, setReload] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { logout } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Mis datos",
      render: () => (
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Settings.AvatarForm />
          <Separator height={50} />
          <Settings.ChangeNameForm />
        </Box>
      ),
    },
    {
      menuItem: "Mis direcciones",
      render: () => (
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
        </Box>
      ),
    },
    {
      menuItem: "Mis pedidos",
      render: () => <Orders.List />,
    },
  ];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === panes.length) {
      logout();
      return;
    }
    setActiveTab(newValue);
  };

  return (
    <BasicLayout>
      <Container>
        <Box
          sx={{
            bgcolor: "background.paper",
            display: "flex",
            minHeight: 400,
          }}
        >
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              position: "relative",
              mt: "50px",
              "& .MuiTabs-indicator": {
                width: 4,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                minWidth: 300,
                minHeight: 40,
                alignItems: "flex-start",
                border: "1px solid transparent",
                borderBottom: "none",
                px: 3,
              },
            }}
          >
            {panes.map((pane, index) => (
              <Tab key={index} label={pane.menuItem} />
            ))}
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LogoutIcon fontSize="small" />
                  Cerrar sesión
                </Box>
              }
            />
          </Tabs>

          <Box
            sx={{
              width: "100%",
              pl: 3,
              mt: "50px",
            }}
          >
            {panes[activeTab]?.render()}
          </Box>
        </Box>
      </Container>
    </BasicLayout>
  );
}
