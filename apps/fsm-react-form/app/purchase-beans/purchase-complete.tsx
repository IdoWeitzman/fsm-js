import { Box, Container, Typography } from "@mui/material";
import styles from "./styles.module.css";

export const PurchaseComplete = () => (
  <Box
    display="flex"
    flexDirection="column"
    gap={1}
    data-testid="purchase-complete-wrapper"
  >
    <Typography>
      Payment Successful!
      <br />
      Thank you for shopping with us.
      <br />
      Use this coupon to get 10% off your next purchase: <b>INTUIT2024</b>
    </Typography>
    <Box className={styles.firework} />
  </Box>
);
