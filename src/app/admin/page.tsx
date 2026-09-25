"use client";
import { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { BasicLayout } from "../components/Layouts";
import { Search } from "../components/Shared";
import { Product, Category, User } from "@/app/components/Admin";
import { useAuth } from "@/hooks";

export default function AdminPage() {
  const [reload, setReload] = useState(false);
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const onReload = () => setReload((prevState) => !prevState);

  if (!isAdmin) {
    router.push("/");
    return null;
  }

  const panes = [
    {
      menuItem: "Productos",
      render: () => (
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "20px",
            }}
          >
            <Search queryName="searchAdmin" />
            <Product.AddProduct onReload={onReload} />
          </Box>
          <Product.ListProducts reload={reload} onReload={onReload} />
        </Box>
      ),
    },
    {
      menuItem: "Categorías",
      render: () => (
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "20px",
            }}
          >
            <div />
            <Category.AddCategory onReload={onReload} />
          </Box>
          <Category.ListCategories reload={reload} onReload={onReload} />
        </Box>
      ),
    },
    {
      menuItem: "Usuarios",
      render: () => (
        <Box sx={{ p: 1 }}>
          <User.List reload={reload} onReload={onReload} />
        </Box>
      ),
    },
  ];

  return (
    <BasicLayout>
      <Container sx={{ mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            position: "relative",
            mt: "50px",
            "& .MuiTab-root": {
              minHeight: 42,
              border: "1px solid transparent",
              borderBottom: "none",
              borderRadius: "6px 6px 0 0",
              px: 3,
              "&.Mui-selected": {
                backgroundColor: "background.paper",
                borderColor: "divider",
                borderBottomColor: "background.paper",
              },
            },
          }}
        >
          {panes.map((pane, index) => (
            <Tab key={index} label={pane.menuItem} />
          ))}
        </Tabs>

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: "0 6px 6px 6px",
            backgroundColor: "background.paper",
            mt: "-1px",
          }}
        >
          {panes[activeTab]?.render()}
        </Box>
      </Container>
    </BasicLayout>
  );
}
