import { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
  Chip,
} from "@mui/material";

import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHover, setIsHover] = useState(false);
  const [isImageLoaded, setisImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHover
      ? //TODO Checar que functione en hover
        product.images[1]
      : product.images[0];
  }, [isHover, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  label="En producción"
                  color="primary"
                  sx={{
                    position: "absolute",
                    zIndex: "3",
                    inset: " 10px auto auto 5px",
                  }}
                />
              )}
              <CardMedia
                className="fadeIn im"
                component="img"
                image={productImage}
                alt={product.title}
                onLoad={() => setisImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight={700}> {product.title} </Typography>
        <Typography fontWeight={500}> {`$${product.price}`} </Typography>
      </Box>
    </Grid>
  );
};
