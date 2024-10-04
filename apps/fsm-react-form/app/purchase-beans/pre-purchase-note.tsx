import { OutlinedButton } from "@/components/outlined-button";
import { Box, Typography } from "@mui/material";

interface PrePurchaseNoteProps {
  onAckClick: () => void;
  onRejectClick: () => void;
}

export const PrePurchaseNote = ({
  onAckClick,
  onRejectClick,
}: PrePurchaseNoteProps) => {
  return (
    <Box>
      <Typography variant="h6">
        Please acknowledge that you are about to buy homemade roasted coffee
        beans. <br /> Quality may vary.
      </Typography>
      <Box display="flex" gap={1} marginTop={4}>
        <OutlinedButton onClick={onAckClick}>Ok</OutlinedButton>
        <OutlinedButton onClick={onRejectClick}>
          Not interested, take me back
        </OutlinedButton>
      </Box>
    </Box>
  );
};
