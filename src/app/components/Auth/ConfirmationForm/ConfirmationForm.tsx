"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Alert, Box, Button, TextField } from "@mui/material";
import { Separator } from "@/app/components/Shared";
import {
  initialValues,
  validationSchema,
} from "@/app/components/Auth/ConfirmationForm/ConfirmationForm.form";
import { authCtrl } from "@/api";
import { getAuthError } from "@/utils/authErrors";

interface Feedback {
  severity: "error" | "success";
  message: string;
}

export function ConfirmationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setFeedback(null);

      try {
        await authCtrl.confirmation(formValue.email, formValue.code);
        router.push("/join/login");
      } catch (error) {
        const { message, unexpected } = getAuthError(error, "confirm");
        if (unexpected) console.error(error);
        setFeedback({ severity: "error", message });
      }
    },
  });

  const onResendCode = async () => {
    formik.setFieldError("email", undefined);
    setFeedback(null);

    if (!formik.values.email) {
      formik.setFieldError("email", "Email inválido");
      return;
    }

    setLoading(true);
    try {
      await authCtrl.resendCode(formik.values.email);
      setFeedback({
        severity: "success",
        message: "Te enviamos un nuevo código a tu correo.",
      });
    } catch (error) {
      const { message, unexpected } = getAuthError(error, "resend");
      if (unexpected) console.error(error);
      setFeedback({ severity: "error", message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    formik.setFieldValue("email", email ?? "");
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
      {feedback && (
        <Alert severity={feedback.severity} sx={{ mb: 1.5 }}>
          {feedback.message}
        </Alert>
      )}
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
