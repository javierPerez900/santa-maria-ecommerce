"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.form";
import { authCtrl } from "@/api";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authCtrl.login(formValue.email, formValue.password);
        await login();
        router.push("/");
      } catch (error) {
        console.error(error);
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
        <Button
          type="submit"
          fullWidth
          loading={formik.isSubmitting}
          sx={{ color: "#f6f8f7", bgcolor: "#119c62" }}
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
        sx={{ color: "#4e5552", borderColor: "#4e5552" }}
      >
        Crear cuenta
      </Button>
    </>
  );
}
