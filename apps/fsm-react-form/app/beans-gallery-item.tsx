"use server";
import { CoffeeBean } from "./types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";

interface BeansGalleryItemProps {
  beansItemData: CoffeeBean;
}

const responsiveDisplay = {
  display: {
    xs: "none",
    md: "block",
  },
};

export const BeansGalleryItem = async ({
  beansItemData,
}: BeansGalleryItemProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 190,
        minHeight: 370,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={beansItemData.imageUrl}
        title="Coffee beans image"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {beansItemData.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {beansItemData.tastingNotes}
        </Typography>
        <Box display="flex" flexDirection="column" marginY={1}>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              ...responsiveDisplay,
            }}
          >
            Roast type: {beansItemData.roastType}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              ...responsiveDisplay,
            }}
          >
            Region: {beansItemData.region}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Price (250G): {beansItemData.price}$
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Link href="/purchase-beans">
          <Button size="small" variant="contained">
            Buy Now
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
