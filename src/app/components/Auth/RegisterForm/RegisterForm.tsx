"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authCtrl } from "@/api";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";

export function RegisterForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authCtrl.register(formValue.email, formValue.password);
        router.push(`/join/confirmation?email=${formValue.email}`);
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

        <Button
          type="submit"
          fullWidth
          loading={formik.isSubmitting}
          sx={{ color: "#f6f8f7", bgcolor: "#119c62" }}
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
