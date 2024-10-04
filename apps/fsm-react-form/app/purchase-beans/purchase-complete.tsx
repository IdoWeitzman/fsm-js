import { Box, Typography } from "@mui/material";

export const PurchaseComplete = () => (
  <Box display="flex" flexDirection="column" gap={1}>
    <Typography>
      Payment Success! We will be in touch shortly for delivery.
      <br />
      For your next purchase use the coupon <b>INTUIT2024</b> for extra 10% off!
    </Typography>
  </Box>
);
