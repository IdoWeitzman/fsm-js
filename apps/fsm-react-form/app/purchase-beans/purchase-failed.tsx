import { OutlinedButton } from "@/components/outlined-button";
import { Box, Typography } from "@mui/material";

interface PurchaseFailedProps {
  onBackClick: () => void;
}

export const PurchaseFailed = ({ onBackClick }: PurchaseFailedProps) => (
  <Box display="flex" flexDirection="column" gap={1}>
    <Typography>Payment Failed. Please go back and try again.</Typography>
    <OutlinedButton onClick={onBackClick}>Back</OutlinedButton>
  </Box>
);
