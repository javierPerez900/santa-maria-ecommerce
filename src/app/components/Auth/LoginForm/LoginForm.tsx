"use client";
import { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.form";
import { authCtrl } from "@/api";
import { authErrorName, getAuthError } from "@/utils/authErrors";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setAuthError(null);

      try {
        await authCtrl.login(formValue.email, formValue.password);
        await login();
        router.push("/");
      } catch (error) {
        if (authErrorName(error) === "UserNotConfirmedException") {
          router.push(
            `/join/confirmation?email=${encodeURIComponent(formValue.email)}`,
          );
          return;
        }

        const { message, unexpected } = getAuthError(error, "login");
        if (unexpected) console.error(error);
        setAuthError(message);
      }
    },
  });

  return (
    <>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ mb: 1.5 }}
          hiddenLabel
          fullWidth
          name="email"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={!!formik.errors.email}
        />
        <TextField
          sx={{ mb: 1.5 }}
          hiddenLabel
          fullWidth
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={!!formik.errors.password}
        />
        {authError && (
          <Alert severity="error" sx={{ mb: 1.5 }}>
            {authError}
          </Alert>
        )}
        <Button
          type="submit"
          fullWidth
          loading={formik.isSubmitting}
          sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
        >
          Iniciar sesión
        </Button>
      </Box>

      <Typography sx={{ textAlign: "center", m: "30px 0" }}>
        ¿Eres nuevo cliente?
      </Typography>
      <Button
        component={Link}
        href="/join/register"
        fullWidth
        variant="outlined"
      >
        Crear cuenta
      </Button>
    </>
  );
}
