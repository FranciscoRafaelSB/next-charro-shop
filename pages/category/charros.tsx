import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";
import { Typography } from "@mui/material";

const CharrosPage = () => {
  const { products, isLoading } = useProducts("/products?gender=charros");
  return (
    <ShopLayout
      title={"Charro Shop - Charros"}
      pageDescription={
        "Encuentra los mejores productos para vestir como un charro"
      }
    >
      <Typography variant="h1" component="h1">
        Charros
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para charros
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default CharrosPage;
