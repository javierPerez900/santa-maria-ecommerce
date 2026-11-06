"use client";
import { useState, useCallback } from "react";
import { Button, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ProductImageForm.form";
import { productCtrl } from "@/api";

export function ProductImageForm({
  onClose,
  onReload,
  productId,
}: {
  onClose: () => void;
  onReload: () => void;
  productId: number;
}) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        if (!formValue.file) return;
        await productCtrl.updateImage(productId, formValue.file);
        setLoading(false);
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("file", file);
    formik.setFieldValue("preview", URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"] },
    onDrop,
  });

  const getMiniature = () => {
    if (formik.values.file) {
      return formik.values.preview;
    }
    return null;
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: "20px",
          "& > img": {
            height: "400px !important",
            width: "400px !important",
            border: "2px dashed",
            borderColor: "primary.main",
            p: "10px",
            "&:hover": {
              cursor: "pointer",
              opacity: 0.6,
            },
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {getMiniature() ? (
          <img
            src={getMiniature()!}
            alt="preview"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              minHeight: "200px",
              border: "2px dashed",
              borderColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              "&:hover": {
                cursor: "pointer",
                opacity: 0.6,
              },
            }}
          >
            <span>Arrastra la nueva imagen</span>
          </Box>
        )}
      </Box>

      <Button
        onClick={() => formik.handleSubmit()}
        fullWidth
        loading={loading}
        sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
      >
        Enviar
      </Button>
    </Box>
  );
}
