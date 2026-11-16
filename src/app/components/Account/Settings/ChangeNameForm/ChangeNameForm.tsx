"use client";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeNameForm.form";
import { useAuth } from "@/hooks";
import { userCtrl } from "@/api";

export function ChangeNameForm() {
  const { user, updateUser } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(
      user?.userFirstName as string,
      user?.userLastName as string,
    ),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(formValue);

        // El servidor ya lo guardó: se actualiza también la copia en memoria,
        // para que al volver a esta pestaña se vea el nombre nuevo
        updateUser("userFirstName", formValue.userFirstName);
        updateUser("userLastName", formValue.userLastName);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Cambiar nombre y apellidos
      </Typography>
      <TextField
        sx={{ mb: 1.5 }}
        hiddenLabel
        fullWidth
        name="userFirstName"
        placeholder="Nombre"
        value={formik.values.userFirstName}
        onChange={formik.handleChange}
        error={!!formik.errors.userFirstName}
      />
      <TextField
        sx={{ mb: 1.5 }}
        hiddenLabel
        fullWidth
        name="userLastName"
        placeholder="Apellidos"
        value={formik.values.userLastName}
        onChange={formik.handleChange}
        error={!!formik.errors.userLastName}
      />

      <Button
        type="submit"
        fullWidth
        loading={formik.isSubmitting}
        sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
      >
        Enviar
      </Button>
    </Box>
  );
}
