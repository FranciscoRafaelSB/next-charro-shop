import type { NextPage, GetServerSideProps } from "next";
import { Typography, Box } from "@mui/material";

import { ShopLayout } from "../../components/layouts/ShopLayout";
//Borramos el intial data por el fercher SWR
// import { initialData } from "../../database/products";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  // const { products, isLoading } = useProducts("/search/");

  return (
    <ShopLayout
      title={"Charro-Shop - Busqueda"}
      pageDescription={
        "Busca los mejores productos para vestir como un charro aquí"
      }
    >
      {foundProducts ? (
        <Box display="flex" alignItems="center">
          <Typography variant="h1" component="h1" textTransform="capitalize">
            Término:
          </Typography>
          <Typography
            variant="h2"
            fontSize={35}
            sx={{ ml: 2 }}
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningún producto
          </Typography>
          <Typography
            variant="h2"
            sx={{ ml: 1 }}
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}

      {/* <FullScreenLoading /> */}
      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  //y no hy productos
  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  //TODO retornar otros productos
  if (!foundProducts) {
    products = await dbProducts.getProductsByTerm("camisa");
  }

  return {
    props: { products, foundProducts, query },
  };
};

export default SearchPage;
