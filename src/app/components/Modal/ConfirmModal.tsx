import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";

interface ConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  content: string;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  const { onCancel, onConfirm, content, ...rest } = props;
  const [loading, setLoading] = useState(false);

  const onConfirmWrapper = () => {
    setLoading(true);
    onConfirm();
  };

  return (
    <Dialog maxWidth="sm" {...rest}>
      <DialogContent>{content}</DialogContent>
      <Divider />
      <DialogActions>
        <Button
          autoFocus
          onClick={onCancel}
          sx={{ color: "text.secondary", borderColor: "text.secondary" }}
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          onClick={onConfirmWrapper}
          sx={{ color: "primary.contrastText", bgcolor: "primary.main" }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
