import { Box, CircularProgress, Typography } from "@mui/material";

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="calc(60vh - 200px)"
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
    >
      <Typography
        variant="h5"
        component="h5"
        fontSize={20}
        fontWeight={200}
        sx={{ mb: 2 }}
      >
        Cargando...
      </Typography>
      <CircularProgress thickness={2} />
    </Box>
  );
};
