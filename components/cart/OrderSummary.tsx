import { FC, useContext } from "react";

import { Grid, Typography, Divider, Box } from "@mui/material";
import { CartContex } from "../../context/cart/CartContext";
import { currency } from "../../utils";
import { IOrder } from "../../interfaces";

interface Props {
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
  };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContex);

  const summaryValues = orderValues
    ? orderValues
    : { numberOfItems, subTotal, tax, total };

  return (
    <Grid container>
      <Grid container>
        <Grid item xs={6}>
          <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end">
          <Typography>
            {summaryValues.numberOfItems}{" "}
            {summaryValues.numberOfItems > 0 ? "productos" : "producto"}
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={6}>
          <Typography>Subtotal</Typography>
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={6} display="flex" justifyContent="end">
          <Typography>{currency.format(summaryValues.subTotal)}</Typography>
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={6}>
          <Typography>Envío</Typography>
        </Grid>
        <Grid item sx={{ mt: 1 }} xs={6} display="flex" justifyContent="end">
          <Typography>{currency.format(summaryValues.tax)}</Typography>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Divider variant="middle" sx={{ mt: 2 }} />
        {/* <Divider sx={{ my: 1 }} /> */}
      </Box>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">{`Total`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {currency.format(summaryValues.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
