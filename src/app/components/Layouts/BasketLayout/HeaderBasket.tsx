"use client";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/app/components/Shared";
import { Box } from "@mui/material";
import { map } from "lodash";
import CheckIcon from "@mui/icons-material/Check";

export function HeaderBasket() {
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step"));

  const steps = [
    { number: 1, title: "Cesta" },
    { number: 2, title: "Dirección de envío" },
    { number: 3, title: "Método de pago" },
    { number: 4, title: "Confirmación" },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        width: "100%",
        p: "5px 20px",
        zIndex: 5,
        backgroundColor: "background.default",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ width: "20%" }}>
        <Logo />
      </Box>
      <Box
        sx={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
          "& > div": {
            display: "flex",
            alignItems: "center",

            "& > span": {
              color: "text.secondary",
            },
            "& > span:nth-of-type(1)": {
              border: "3px solid",
              borderColor: "divider",
              fontSize: "12px",
              borderRadius: "100px",
              height: "26px",
              width: "26px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pr: "1px",
              pt: "1px",
              mr: "10px",
              "& svg": {
                display: "none",
              },
            },
            "& > span:nth-of-type(3)": {
              width: "100px",
              flexShrink: 0,
              height: "3px",
              backgroundColor: "divider",
              ml: "15px",
              mr: "20px",
            },
            "&:last-of-type > span:nth-of-type(3)": {
              display: "none",
            },
          },
        }}
      >
        {map(steps, (step) => {
          const isActive = step.number === currentStep;
          const isSuccess = step.number < currentStep;
          return (
            <Box
              key={step.number}
              sx={{
                ...(isActive && {
                  "& > span": {
                    color: "text.primary !important",
                    fontWeight: "bold",
                  },
                  "& > span:nth-of-type(1)": {
                    borderColor: "primary.main !important",
                  },
                }),
                ...(isSuccess && {
                  "& > span:nth-of-type(1)": {
                    borderColor: "primary.main !important",
                    backgroundColor: "primary.main !important",
                    color: "primary.main",
                    "& svg": {
                      display: "flex !important",
                      position: "absolute",
                      margin: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.contrastText !important",
                    },
                  },
                }),
              }}
            >
              <span>
                <CheckIcon color="success" sx={{ fontSize: "16px" }} />
                {step.number}
              </span>
              <span>{step.title}</span>
              <span />
            </Box>
          );
        })}
      </Box>
      <Box sx={{ width: "20%" }} />
    </Box>
  );
}
