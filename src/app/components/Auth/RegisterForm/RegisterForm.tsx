"use client";
import { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authCtrl } from "@/api";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { getAuthError } from "@/utils/authErrors";

export function RegisterForm() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setAuthError(null);

      try {
        await authCtrl.register(formValue.email, formValue.password);
        router.push(
          `/join/confirmation?email=${encodeURIComponent(formValue.email)}`,
        );
      } catch (error) {
        const { message, unexpected } = getAuthError(error, "register");
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
        <TextField
          sx={{ mb: 1.5 }}
          hiddenLabel
          fullWidth
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={!!formik.errors.repeatPassword}
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
          Crear cuenta
        </Button>
      </Box>

      <Typography sx={{ textAlign: "center", m: "30px 0" }}>
        Ya tengo una cuenta
      </Typography>
      <Button
        component={Link}
        href="/join/login"
        fullWidth
        variant="outlined"
        sx={{ color: "#4e5552", borderColor: "#4e5552" }}
      >
        Iniciar sesión
      </Button>
    </>
  );
}
