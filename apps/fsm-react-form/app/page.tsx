import { BeansGallery } from "./beans-gallery";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <Container
      sx={{
        padding: 4,
      }}
    >
      <BeansGallery />
    </Container>
  );
}
