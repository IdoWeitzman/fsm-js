"use server";
import { getCoffeeBeansData } from "@/server_mock/handler";
import { CoffeeBean } from "./types";
import { BeansGalleryItem } from "./beans-gallery-item";
import Grid from "@mui/material/Grid2";

export const BeansGallery = async () => {
  const beansGalleryItems: CoffeeBean[] = await getCoffeeBeansData();

  console.log("gallery items", beansGalleryItems);
  return (
    <Grid height="100%" container spacing={2}>
      {beansGalleryItems.map((beansItemData) => (
        <Grid size={4} key={beansItemData.id}>
          <BeansGalleryItem beansItemData={beansItemData} />
        </Grid>
      ))}
    </Grid>
  );
};
