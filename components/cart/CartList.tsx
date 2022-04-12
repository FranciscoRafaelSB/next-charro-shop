import NextLink from "next/link";

import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
// import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";
import { FC, useContext } from "react";
import { CartContex } from "../../context";
import { ICartProduct, IOrderItem } from "../../interfaces";

// const productsInCart = [
//   initialData.products[0],
//   initialData.products[1],
//   initialData.products[2],
// ];

interface Props {
  editable?: boolean;
  // products: IProduct;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContex);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const onRemoveItem = (product: ICartProduct) => {
    removeCartProduct(product);
  };

  const productsToShow = products ? products : cart;

  // console.log(productsToShow);

  return (
    <>
      {productsToShow.map((product) => (
        <Grid
          key={product.slug + product.size}
          container
          spacing={2}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            {/* TODO LLEVAR A LA PAGINA DEL PRODUCTO */}
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={product.image}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>

          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1"> {product.title} </Typography>
              <Typography variant="body1">
                Talla <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={product.inStock}
                  updatedQuantity={(value) =>
                    onNewCartQuantityValue(product as ICartProduct, value)
                  }
                />
              ) : (
                <Typography variant="body2">
                  Catidad:
                  <strong>
                    {product.quantity}
                    {product.quantity > 1 ? "productos" : "producto"}
                  </strong>
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems={"center"}
            flexDirection="column"
          >
            <Typography variant="subtitle1"> ${product.price} </Typography>
            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => onRemoveItem(product as ICartProduct)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
