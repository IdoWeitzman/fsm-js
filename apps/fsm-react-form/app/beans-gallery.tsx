import { CoffeeBean } from "./types";
import { BeansGalleryItem } from "./beans-gallery-item";
import Grid from "@mui/material/Grid2";
import beansDataMock from "../server_mock/db.json";

interface BeansGalleryProps {
  beansGalleryItems: CoffeeBean[];
}
export const getStaticProps = async () => {
  return { props: { beansGalleryItems: beansDataMock } };
};

export const BeansGallery = ({ beansGalleryItems }: BeansGalleryProps) => {
  return (
    <Grid height="100%" container spacing={2} data-testid="gallery">
      {beansGalleryItems.map((beansItemData) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
          key={beansItemData.id}
        >
          <BeansGalleryItem beansItemData={beansItemData} />
        </Grid>
      ))}
    </Grid>
  );
};
