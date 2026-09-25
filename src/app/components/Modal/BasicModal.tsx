import { Dialog, DialogTitle, DialogContent } from "@mui/material";

interface BasicModalProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  title: string;
}

export default function BasicModal({
  children,
  show,
  onClose,
  title,
}: BasicModalProps) {
  return (
    <Dialog open={show} onClose={onClose} maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
