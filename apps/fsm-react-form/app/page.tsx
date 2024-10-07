import { Typography } from "@mui/material";
import { BeansGallery } from "./beans-gallery";
import Container from "@mui/material/Container";
import beansDataMock from "../server_mock/db.json";

export default function BeansShopGallery() {
  return (
    <Container
      sx={{
        padding: 4,
      }}
    >
      <Typography marginBottom={3} variant="h2" fontWeight={600}>
        Coffee Beans shop
      </Typography>
      <BeansGallery beansGalleryItems={beansDataMock} />
    </Container>
  );
}
