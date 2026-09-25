import { useState, useEffect } from "react";
import { TableCell } from "@mui/material";
import { fn } from "@/utils/functions";
import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const NOT_FOUND_IMG = "/images/not-found.jpg";

interface UserType {
  userDateAdd: string;
  userDateUpd: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userStatus: string;
  userUUID: string;
}

interface UserProps {
  user: UserType;
  onReload: () => void;
}

export function User({ user, onReload }: UserProps) {
  const [avatar, setAvatar] = useState<string>(NOT_FOUND_IMG);
  const isAdmin = user.userStatus === "0";

  useEffect(() => {
    const imageUrl = `${fn.getUrlImage(user.userUUID)}?v=${Date.now()}`;

    fn.checkIfImageExists(imageUrl, (exists) => {
      if (exists) setAvatar(imageUrl);
    });
  }, [user]);

  return (
    <>
      <TableCell>
        <Image
          src={avatar}
          alt={user.userEmail}
          width={50}
          height={50}
          style={{ height: 50, width: "auto" }}
          loading="eager"
        />
      </TableCell>
      <TableCell>{user.userEmail}</TableCell>
      <TableCell>
        {isAdmin ? (
          <CheckIcon color="success" />
        ) : (
          <CloseIcon sx={{ color: "red" }} />
        )}
      </TableCell>
    </>
  );
}
