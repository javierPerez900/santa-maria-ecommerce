"use client";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/app/components/Shared";
import { Box } from "@mui/material";
import { map } from "lodash";
import CheckIcon from "@mui/icons-material/Check";

export function HeaderBasket() {
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 1;

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
        backgroundColor: "background.paper",
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
        }}
      >
        {map(steps, (step) => {
          const isActive = step.number === currentStep;
          const isSuccess = step.number < currentStep;

          return (
            <Box
              key={step.number}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  position: "relative",
                  border: "3px solid",
                  borderColor:
                    isActive || isSuccess ? "primary.main" : "divider",
                  bgcolor: isSuccess ? "primary.main" : "transparent",
                  color: isSuccess
                    ? "transparent"
                    : isActive
                      ? "text.primary"
                      : "text.secondary",
                  fontSize: "12px",
                  fontWeight: isActive ? 700 : 400,
                  borderRadius: "100px",
                  height: 26,
                  width: 26,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: "10px",
                }}
              >
                {isSuccess ? (
                  <CheckIcon
                    sx={{
                      fontSize: 16,
                      color: "primary.contrastText",
                    }}
                  />
                ) : (
                  step.number
                )}
              </Box>

              <Box
                component="span"
                sx={{
                  color: isActive ? "text.primary" : "text.secondary",
                  fontWeight: isActive ? 700 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {step.title}
              </Box>

              {step.number !== steps.length && (
                <Box
                  component="span"
                  sx={{
                    width: 100,
                    flexShrink: 0,
                    height: "3px",
                    bgcolor: isSuccess ? "primary.main" : "divider",
                    ml: "15px",
                    mr: "20px",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
      <Box sx={{ width: "20%" }} />
    </Box>
  );
}
