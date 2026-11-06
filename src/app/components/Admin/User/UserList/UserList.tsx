"use client";
import { useState, useEffect } from "react";
import { userCtrl } from "@/api";
import { Loading, Pagination } from "@/app/components/Shared";
import { User } from "./User/User";
import { map } from "lodash";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { useSearchParams } from "next/navigation";

interface User {
  userDateAdd: string;
  userDateUpd: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userStatus: string;
  userUUID: string;
}

const ITEMS_PER_PAGE = 10;

export function UserList({
  reload,
  onReload,
}: {
  reload: boolean;
  onReload: () => void;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const [users, setUsers] = useState<User[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userCtrl.getAll(page);
        setUsers(response.data);
        setTotalPages(Math.ceil(response.totalItems / ITEMS_PER_PAGE));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload, page]);

  if (!users) return <Loading text="Cargando Usuarios" />;

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& tr:nth-of-type(odd)": { backgroundColor: "action.hover" },
            }}
          >
            {map(users, (user) => (
              <TableRow key={user.userUUID}>
                <User user={user} onReload={onReload} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
