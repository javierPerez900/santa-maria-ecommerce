"use client";
import { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem, Grid } from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ProductForm.form";
import { map } from "lodash";
import { Editor } from "@tinymce/tinymce-react";
import { Separator } from "@/app/components/Shared";
import { productCtrl, categoryCtrl } from "@/api";
import { Product } from "@/interfaces/product";

interface Category {
  key: number;
  value: number;
  text: string;
}

export function ProductForm({
  onClose,
  onReload,
  product = null,
}: {
  onClose: () => void;
  onReload: () => void;
  product?: Product | null;
}) {
  const [categories, setCategories] = useState<Category[] | []>([]);

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (product) {
          await productCtrl.update(formValue, product.prodID);
        } else {
          await productCtrl.create(formValue);
        }
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
        const result = map(response, (item) => ({
          key: item.categID,
          value: item.categID,
          text: item.categName,
        }));
        setCategories(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ mb: 1.5 }}
        hiddenLabel
        fullWidth
        name="ProdTitle"
        placeholder="Nombre"
        value={formik.values.ProdTitle}
        onChange={formik.handleChange}
        error={!!formik.errors.ProdTitle}
      />
      <TextField
        sx={{ mb: 1.5 }}
        hiddenLabel
        fullWidth
        name="ProdPath"
        placeholder="Slug"
        value={formik.values.ProdPath}
        onChange={formik.handleChange}
        error={!!formik.errors.ProdPath}
      />
      <Editor
        apiKey="fm9jpxk1vtc89f520fgu42zr0pv9algse2p8wyd1kioswbh1"
        init={{
          height: 400,
          menubar: false,
          toolbar_mode: "wrap",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | code |" +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
        initialValue={formik.values.ProdDescription}
        onBlur={(event) =>
          formik.setFieldValue("ProdDescription", event.target.getContent())
        }
      />
      <Separator height={20} />

      <TextField
        sx={{ mb: 1.5 }}
        select
        fullWidth
        hiddenLabel
        name="ProdCategId"
        placeholder="Categoría del producto"
        slotProps={{
          select: {
            displayEmpty: true,
            renderValue: (value) => {
              if (!value)
                return (
                  <span style={{ color: "#aaa" }}>Categoría del producto</span>
                );
              const cat = categories.find((c) => c.value === value);
              return cat?.text || "";
            },
          },
        }}
        value={formik.values.ProdCategId}
        error={!!formik.errors.ProdCategId}
        onChange={(e) => formik.setFieldValue("ProdCategId", e.target.value)}
      >
        <MenuItem disabled value="">
          <em>Categoría del producto</em>
        </MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.key} value={cat.value}>
            {cat.text}
          </MenuItem>
        ))}
      </TextField>

      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid size={6}>
          <TextField
            hiddenLabel
            fullWidth
            type="number"
            name="ProdPrice"
            placeholder="Precio"
            value={formik.values.ProdPrice}
            onChange={formik.handleChange}
            error={!!formik.errors.ProdPrice}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            hiddenLabel
            fullWidth
            type="number"
            name="ProdStock"
            placeholder="Stock"
            value={formik.values.ProdStock}
            onChange={formik.handleChange}
            error={!!formik.errors.ProdStock}
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
