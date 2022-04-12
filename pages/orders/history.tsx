import NextLink from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { ShopLayout } from "../../components/layouts";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces/";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },

  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra informacion si esta pagada la orden o no",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Ver Order",
    width: 100,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderId}`} passHref>
          <Link underline="always">
            {params.row.paid ? "Ver Orden" : "Pagar Orden"}
          </Link>
        </NextLink>
      );
    },
  },
  {
    field: "orderId",
    headerName: "Orden ID",
    width: 300,
  },
];

// const rows = [
//   { id: 1, paid: true, fullname: "Francisco Rafael" },
//   { id: 2, paid: false, fullname: "Eduardo Rios" },
//   { id: 3, paid: false, fullname: "Janeth Carolina" },
//   { id: 4, paid: true, fullname: "Brenda Jimenez" },
//   { id: 5, paid: false, fullname: "Emin Rodrigez" },
//   { id: 6, paid: true, fullname: "Pedro Alfonso" },
//   { id: 7, paid: true, fullname: "Paloma Guadalupe" },
// ];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    paid: order.isPaid,
    fullname:
      order.shippingAddress.firstName + " " + order.shippingAddress.lastName,
    orderId: order._id,
  }));

  return (
    <ShopLayout
      title={"Historial de ordenes"}
      pageDescription={"Historial de ordenes del cliente"}
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const { data } = await  // your fetch function here

  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrderByuser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
