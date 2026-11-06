"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { Separator } from "@/app/components/Shared";
import {
  initialValues,
  validationSchema,
} from "@/app/components/Auth/ConfirmationForm/ConfirmationForm.form";
import { authCtrl } from "@/api";

export function ConfirmationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authCtrl.confirmation(formValue.email, formValue.code);
        router.push("/join/login");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onResendCode = async () => {
    formik.setFieldError("email", undefined);
    if (!formik.values.email) {
      formik.setFieldError("email", "Email inválido");
      return;
    }

    setLoading(true);
    await authCtrl.resendCode(formik.values.email);
    setLoading(false);
  };

  useEffect(() => {
    formik.setFieldValue("email", email);
  }, [searchParams]);

  return (
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
        name="code"
        placeholder="Código de confirmación"
        value={formik.values.code}
        onChange={formik.handleChange}
        error={!!formik.errors.code}
      />
      <Button
        type="submit"
        fullWidth
        loading={formik.isSubmitting}
        sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
      >
        Activar usuario
      </Button>
      <Separator height={75} />
      <Button
        fullWidth
        variant="outlined"
        sx={{ color: "#4e5552", borderColor: "#4e5552" }}
        onClick={onResendCode}
        loading={loading}
      >
        Reenviar código de verificación
      </Button>
    </Box>
  );
}
