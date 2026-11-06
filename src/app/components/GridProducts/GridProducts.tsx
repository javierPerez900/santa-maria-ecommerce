import { size, map } from "lodash";
import { Separator } from "../Shared";
import { Loading, NoResult } from "../Shared";
import { Grid, SxProps } from "@mui/material";
import { Product } from "./Product/Product";
import { Product as ProductType } from "@/interfaces/product";

export function GridProducts({
  products,
  columns = 4,
  classProduct,
}: {
  products: ProductType[] | null;
  columns?: number;
  classProduct: SxProps;
}) {
  if (!products) {
    return (
      <>
        <Separator height={50} />
        <Loading text="Cargando productos" />
        <Separator height={50} />
      </>
    );
  }

  if (size(products) === 0) {
    return <NoResult text="No se han encontrado resultados" />;
  }

  const getSizeByColumns = (columns: number) => {
    return 12 / columns;
  };

  return (
    <Grid container spacing={1.5} sx={{ width: "100%", mb: 4 }}>
      {map(products, (product, index) => (
        <Grid key={product.prodID} size={getSizeByColumns(columns)}>
          {/* Solo la primera fila se carga con prioridad; el resto, de forma diferida */}
          <Product
            product={product}
            classProduct={classProduct}
            eager={index < columns}
          />
        </Grid>
      ))}
    </Grid>
  );
}
