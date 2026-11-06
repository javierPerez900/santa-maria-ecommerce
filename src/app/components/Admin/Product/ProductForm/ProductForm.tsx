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

interface TypeOfSale {
  key: number;
  value: number;
  text: string;
}

const typeOfSale: TypeOfSale[] = [
  { key: 1, value: 0, text: "Por caja o unidades" },
  { key: 2, value: 1, text: "Solo unidades" },
];

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
  const [showWholesaleFields, setShowWholesaleFields] = useState<boolean>(
    product != null && Number(product.prodSellOnlyUnit) === 0,
  );
  console.log("product", product);
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

  useEffect(() => {
    const box = Number(formik.values.ProdPriceBox);
    const units = Number(formik.values.ProdUnitsPerBox);
    const next = box > 0 && units > 0 ? (box / units).toFixed(2) : "";

    if (String(formik.values.ProdPriceWholesaleUnit) !== next) {
      formik.setFieldValue("ProdPriceWholesaleUnit", next);
    }
  }, [formik.values.ProdPriceBox, formik.values.ProdUnitsPerBox]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ my: 1.5 }}
        fullWidth
        label={
          formik.values.ProdTitle === "" ? undefined : "Nombre del producto"
        }
        name="ProdTitle"
        placeholder="Nombre"
        value={formik.values.ProdTitle}
        onChange={formik.handleChange}
        error={!!formik.errors.ProdTitle}
      />
      <TextField
        sx={{ mb: 1.5 }}
        label={formik.values.ProdPath === "" ? undefined : "Slug"}
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
      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid size={6}>
          <TextField
            sx={{ mb: 1.5 }}
            select
            fullWidth
            label={formik.values.ProdCategId === "" ? undefined : "Categoría"}
            name="ProdCategId"
            placeholder="Categoría del producto"
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (value) => {
                  if (!value)
                    return (
                      <span style={{ color: "#aaa" }}>
                        Categoría del producto
                      </span>
                    );
                  const cat = categories.find((c) => c.value === value);
                  return cat?.text || "";
                },
              },
            }}
            value={formik.values.ProdCategId}
            error={!!formik.errors.ProdCategId}
            onChange={(e) =>
              formik.setFieldValue("ProdCategId", e.target.value)
            }
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
        </Grid>
        <Grid size={6}>
          <TextField
            sx={{ mb: 1.5 }}
            select
            fullWidth
            label={
              formik.values.ProdSellOnlyUnit === ""
                ? undefined
                : "Tipo de venta"
            }
            name="ProdSellOnlyUnit"
            placeholder="Tipo de venta"
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (value) => {
                  if (value === "")
                    return <span style={{ color: "#aaa" }}>Tipo de venta</span>;
                  const T = typeOfSale.find(
                    (t) => String(t.value) === String(value),
                  );
                  return T?.text || "";
                },
              },
            }}
            value={formik.values.ProdSellOnlyUnit}
            error={!!formik.errors.ProdSellOnlyUnit}
            onChange={(e) => {
              formik.setFieldValue("ProdSellOnlyUnit", Number(e.target.value));
              setShowWholesaleFields(
                Number(e.target.value) === 1 ? false : true,
              );
            }}
          >
            <MenuItem disabled value="">
              <em>Tipo de venta</em>
            </MenuItem>
            {typeOfSale.map((t) => (
              <MenuItem key={t.key} value={t.value}>
                {t.text}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      {showWholesaleFields && (
        <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
          <Grid size={6}>
            <TextField
              label={
                formik.values.ProdPriceBox === ""
                  ? undefined
                  : "Precio por caja"
              }
              fullWidth
              type="number"
              name="ProdPriceBox"
              placeholder="Precio por caja"
              value={formik.values.ProdPriceBox}
              onChange={formik.handleChange}
              error={!!formik.errors.ProdPriceBox}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label={
                formik.values.ProdUnitsPerBox === ""
                  ? undefined
                  : "Unidades por caja"
              }
              fullWidth
              type="number"
              name="ProdUnitsPerBox"
              placeholder="Unidades por caja"
              value={formik.values.ProdUnitsPerBox}
              onChange={formik.handleChange}
              error={!!formik.errors.ProdUnitsPerBox}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label={
                formik.values.ProdWholesaleMinQty === ""
                  ? undefined
                  : "Cantidad mínima para venta al por mayor"
              }
              fullWidth
              type="number"
              name="ProdWholesaleMinQty"
              placeholder="Cantidad mínima para venta al por mayor"
              value={formik.values.ProdWholesaleMinQty}
              onChange={formik.handleChange}
              error={!!formik.errors.ProdWholesaleMinQty}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label={
                formik.values.ProdPriceWholesaleUnit === ""
                  ? undefined
                  : "Precio por unidad al por mayor"
              }
              fullWidth
              type="number"
              name="ProdPriceWholesaleUnit"
              placeholder="Precio por unidad al por mayor"
              slotProps={{ input: { readOnly: true } }}
              value={formik.values.ProdPriceWholesaleUnit}
              onChange={formik.handleChange}
              error={!!formik.errors.ProdPriceWholesaleUnit}
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        <Grid size={6}>
          <TextField
            label={
              formik.values.ProdPrice === "" ? undefined : "Precio por unidad"
            }
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
            label={formik.values.ProdStock === "" ? undefined : "Stock"}
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
        sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
      >
        Enviar
      </Button>
    </Box>
  );
}
