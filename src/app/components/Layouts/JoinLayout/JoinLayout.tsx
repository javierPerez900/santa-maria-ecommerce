"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { data } from "@/app/components/Layouts/JoinLayout/JoinLayout.data";
import { map } from "lodash";
import type { ElementType } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Logo } from "@/app/components/Shared";

const iconByName: Record<string, ElementType> = {
  truck: LocalShippingIcon,
  wechat: SupportAgentIcon,
};

export function JoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, []);

  if (user) return null;

  return (
    <>
      <Container
        sx={{
          pt: "70px",
          "& > a": {
            display: "block",
            width: "fit-content",
            m: "0 auto 50px",
          },
        }}
      >
        <Logo />

        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "50%",
              borderRight: "1px solid",
              borderColor: "divider",
              p: "40px 60px 40px 40px",
            }}
          >
            {map(data, (item, index) => {
              const IconComponent = iconByName[item.icon];

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: "50px",
                  }}
                >
                  {IconComponent ? (
                    <IconComponent
                      sx={{
                        mr: "20px",
                        fontSize: "40px",
                        width: "40px",
                        height: "40px",
                      }}
                    />
                  ) : null}
                  <Box>
                    <Typography
                      component="h3"
                      sx={{ pb: "8px", fontWeight: 700, fontSize: 18 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: 16, color: "text.secondary" }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ width: "50%", p: "40px 60px 40px 40px" }}>{children}</Box>
        </Box>
      </Container>
    </>
  );
}
