import { Box, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddressForm.form";
import { addressCtrl } from "@/api";
import { AddressType } from "@/interfaces/address";

export function AddressForm({
  onClose,
  address = null,
  onReload,
}: {
  onClose: () => void;
  address?: AddressType | null;
  onReload: () => void;
}) {
  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (address) {
          await addressCtrl.update(formValue, address.addId);
        } else {
          await addressCtrl.create(formValue);
        }
        formik.resetForm();
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ mb: 1.5 }}
        hiddenLabel
        fullWidth
        name="addTitle"
        placeholder="Título de la dirección"
        value={formik.values.addTitle}
        onChange={formik.handleChange}
        error={!!formik.errors.addTitle}
      />

      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid size={6}>
          <TextField
            hiddenLabel
            fullWidth
            name="addName"
            placeholder="Nombre y apellidos"
            value={formik.values.addName}
            onChange={formik.handleChange}
            error={!!formik.errors.addName}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            hiddenLabel
            fullWidth
            name="addAddress"
            placeholder="Dirección"
            value={formik.values.addAddress}
            onChange={formik.handleChange}
            error={!!formik.errors.addAddress}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            hiddenLabel
            fullWidth
            name="addState"
            placeholder="Provincia"
            value={formik.values.addState}
            onChange={formik.handleChange}
            error={!!formik.errors.addState}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            hiddenLabel
            fullWidth
            name="addCity"
            placeholder="Ciudad"
            value={formik.values.addCity}
            onChange={formik.handleChange}
            error={!!formik.errors.addCity}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            hiddenLabel
            fullWidth
            name="addPostalCode"
            placeholder="Código postal"
            value={formik.values.addPostalCode}
            onChange={formik.handleChange}
            error={!!formik.errors.addPostalCode}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            hiddenLabel
            fullWidth
            name="addPhone"
            placeholder="Teléfono"
            value={formik.values.addPhone}
            onChange={formik.handleChange}
            error={!!formik.errors.addPhone}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        loading={formik.isSubmitting}
        sx={{ color: "#f6f8f7", bgcolor: "#119c62" }}
      >
        Enviar
      </Button>
    </Box>
  );
}
