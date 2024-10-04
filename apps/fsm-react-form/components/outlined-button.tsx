import { Button } from "@mui/material";
import { ComponentProps } from "react";

export const OutlinedButton = (
  props: Omit<ComponentProps<typeof Button>, "variant">
) => (
  <Button variant="outlined" {...props}>
    {props.children}
  </Button>
);
