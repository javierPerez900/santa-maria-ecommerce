import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CategoryForm.form";
import { categoryCtrl } from "@/api";

interface CategoryType {
  categID: number;
  categName: string;
  categPath: string;
}

export function CategoryForm({
  onClose,
  onReload,
  category = null,
}: {
  onClose: () => void;
  onReload: () => void;
  category?: CategoryType | null;
}) {
  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) {
          await categoryCtrl.update(formValue, category.categID);
        } else {
          await categoryCtrl.create(formValue);
        }

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
        name="CategName"
        placeholder="Nombre de la categoría"
        value={formik.values.CategName}
        onChange={formik.handleChange}
        error={!!formik.errors.CategName}
      />
      <TextField
        sx={{ mb: 1.5 }}
        hiddenLabel
        fullWidth
        name="CategPath"
        placeholder="Slug de la categoría"
        value={formik.values.CategPath}
        onChange={formik.handleChange}
        error={!!formik.errors.CategPath}
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
