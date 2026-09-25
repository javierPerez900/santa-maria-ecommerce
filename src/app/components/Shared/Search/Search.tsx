"use client";
import { TextField, SxProps, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchProps {
  placeholder?: string;
  sx?: SxProps;
  queryName?: string;
}

export function Search({
  placeholder = "Buscar...",
  sx = { width: "400px" },
  queryName = "search",
}: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputValue = searchParams.get(queryName) || "";

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (event.target.value) {
      params.set(queryName, event.target.value);
    } else {
      cleanSearch();
      return;
    }

    router.replace(`?${params.toString()}`);
  };

  const cleanSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(queryName);
    params.delete("page");
    router.replace(`?${params.toString()}`);
  };

  return (
    <TextField
      placeholder={placeholder}
      sx={sx}
      value={inputValue}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {inputValue ? (
                <CloseIcon
                  onClick={cleanSearch}
                  sx={{
                    fontSize: 20,
                    color: "black",
                    ml: 0.5,
                    mr: -0.5,
                    mt: 0.3,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <SearchIcon
                  sx={{
                    fontSize: 20,
                    color: "#1E1E1E",
                    ml: 0.5,
                    mr: -0.5,
                    mt: 0.3,
                  }}
                />
              )}
            </InputAdornment>
          ),
        },
      }}
      onChange={onChange}
    />
  );
}
