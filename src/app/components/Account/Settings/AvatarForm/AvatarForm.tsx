"use client";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box, Container } from "@mui/material";
import { useFormik } from "formik";
import { fn } from "@/utils/functions";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./AvatarForm.form";
import { userCtrl } from "@/api";

//El parámetro ?v= obliga a pedir la nueva imagen.
const withVersion = (url: string, version: number) => `${url}?v=${version}`;

export function AvatarForm() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const { user } = useAuth();
  const userUUID = user?.userUUID;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      if (!formValue.file) return;
      if (!userUUID) return;

      try {
        setLoading(true);
        await userCtrl.updateAvatar(userUUID, formValue.file);

        // La imagen ya está en S3: se muestra con una URL nueva para saltarse la caché
        setAvatar(withVersion(fn.getUrlImage(userUUID), Date.now()));
        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!userUUID) return;

    const imageUrl = withVersion(fn.getUrlImage(userUUID), Date.now());
    fn.checkIfImageExists(imageUrl, (exists) => {
      setAvatar(exists ? imageUrl : null);
    });
  }, [userUUID]);

  const displayAvatar = formik.values.file ? formik.values.preview : avatar;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("file", file);
    formik.setFieldValue("preview", URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpg", ".jpeg"] },
    onDrop,
  });

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "150px",
          height: "150px",
          mb: "20px",

          "& img": {
            height: "150px !important",
            width: "150px !important",
            border: "2px dashed",
            borderColor: "primary.main",
            "&:hover": {
              cursor: "pointer",
              opacity: 0.6,
            },
          },

          "& > div": {
            width: "100%",
            height: "100%",
            border: "2px dashed",
            borderColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              cursor: "pointer",
              opacity: 0.6,
            },
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt="preview"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <Box>
            <span>Arrastra la imagen</span>
          </Box>
        )}
      </Box>
      <Button
        onClick={() => formik.handleSubmit()}
        loading={loading}
        sx={{ color: "#f6f8f7", bgcolor: "primary.main" }}
      >
        Enviar
      </Button>
    </Container>
  );
}
