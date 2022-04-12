import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";
import { Typography } from "@mui/material";

const EscaramuzasPage = () => {
  const { products, isLoading } = useProducts("/products?gender=escaramusas");
  return (
    <ShopLayout
      title={"Charro Shop - Escaramuzas"}
      pageDescription={
        "Encuentra los mejores productos para vestir como Escaramuza"
      }
    >
      <Typography variant="h1" component="h1">
        Escaramuzas
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para Escaramuzas
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default EscaramuzasPage;
