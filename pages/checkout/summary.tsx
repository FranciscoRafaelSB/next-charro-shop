import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
  Chip,
} from "@mui/material";

import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { CartContex } from "../../context/cart/CartContext";
import { countries } from "../../utils";
import Cookies from "js-cookie";

const SummaryPage = () => {
  const router = useRouter();

  const { shippingAddress, numberOfItems, createOrder } =
    useContext(CartContex);

  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // console.log(shippingAddress?.country);

  const countryFullName = countries.find(
    (country) => country.code === shippingAddress?.country
  )?.name;

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);

    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  if (!shippingAddress) {
    return <></>;
  }

  return (
    <ShopLayout
      title="Resumen de orden"
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          {/* TODO Card list */}
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                RESUMEN ({numberOfItems}
                {numberOfItems === 1 ? "producto" : "productos"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always"> Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}
              </Typography>
              <Typography>{`${shippingAddress?.address}`}</Typography>
              <Typography>{`${shippingAddress?.address2}`}</Typography>
              <Typography>CP: {shippingAddress?.zip}</Typography>
              <Typography>{countryFullName}</Typography>
              <Typography>{shippingAddress?.city}</Typography>
              <Typography>{shippingAddress?.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              {/* TODO ORDER SUMMARY */}
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always"> Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={onCreateOrder}
                  disabled={isPosting}
                >
                  CONFIMAR ORDEN
                </Button>

                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? "flex" : "none", mt: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
