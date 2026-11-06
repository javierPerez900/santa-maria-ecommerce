import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import { map } from "lodash";
import { data } from "./GridCategories.data";

export function GridCategories() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        width: "100%",
      }}
    >
      {map(data, (category) => (
        <Link
          key={category.id}
          href={category.link}
          style={{ flex: 1, minWidth: 0 }}
        >
          <Box
            sx={{
              p: "0 5px",
              textAlign: "center",
              "&:hover": {
                opacity: 0.7,
              },
              "& > h3": {
                color: "text.primary",
                mt: "10px",
                fontSize: "14px",
              },
              "& > img": {
                border: "2px solid",
                borderColor: "secondary.light",
              },
            }}
          >
            <Image
              src={category.image}
              alt={category.title}
              width={300}
              height={300}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 4,
                objectFit: "cover",
              }}
              loading="eager"
            />
            <h3>{category.title}</h3>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
