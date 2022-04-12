import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";

import { ShopLayout } from "../../components/layouts";
import {
  // ColorSelector,
  ProductSlideShow,
  SizeSelector,
} from "../../components/products";

import { ItemCounter } from "../../components/ui";
import { dbProducts } from "../../database";
import { IProduct, ICartProduct, ISize } from "../../interfaces";
import { CartContex } from "../../context";

// import { initialData } from "../../database/products";
// import { ISize } from '../../interfaces/products';
// const product = initialData.products[0];

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  //Solucion uno para cargar productos
  // const router = userRouter();
  // const { products: product, isLoading } = useProducts(
  // `/products/${router.query.slug}`
  // );

  const router = useRouter();

  const { addProductToCart } = useContext(CartContex);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    inStock: product.inStock,
    // color: product.color,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    // console.log("En padre: ", size);
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) {
      return;
    }

    //TODO: Dispatch la accion del contex para agregar al carrito
    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* TODO Slideshow */}
          <ProductSlideShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titulos     */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>
            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1">Cantidad:</Typography>
              {/*TODO Item Counter */}
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock > 5 ? 5 : product.inStock}
              />

              {/* TODO COLOR selector */}
              {/* <Typography variant="subtitle1">Color:</Typography>
              <ColorSelector
                // sizes={[]}
                colors={product.colors}
              /> */}

              {/* TODO Size Component */}
              <Typography variant="subtitle1">Tallas:</Typography>
              <SizeSelector
                // selectedSize={product.sizes[3]}
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                // onSelectedSize={(size) => selectedSize(size)}
                onSelectedSize={selectedSize}
              />
            </Box>

            {/* Agregar al carrito */}
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            {/* Description */}
            <Box marginTop={3}>
              <Typography variant="subtitle2" marginBottom={1}>
                Description
              </Typography>
              <Typography variant="body1">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//getServersSiteProps
//You should only use getServerSiteProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time.
// No usar esto...SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

//getStaticPaths....

export const getStaticPaths: GetStaticPaths = async () => {
  // const {data} = await // your fetch function here

  const productSlug = await dbProducts.getAllProductSlug();

  return {
    paths: productSlug.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    //blocking
    fallback: "blocking",
  };
};

//getStaticProps....
//You should use getStaticProps when...
// The data required to render the page is availble at build time ahead of a user's request.
// The data comes from a headless CMS
//The data can be publicly catched (no user-specifec)
// The page mis be pre rendered fon SEO and very fast - getStaticProps geberates HTML and JSON
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};

export default ProductPage;
