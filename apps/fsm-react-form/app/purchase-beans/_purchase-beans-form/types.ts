import { TextField } from "@mui/material";
import { ChangeEventHandler, ComponentProps } from "react";

export interface FormField {
  id: string;
  labelText: string;
  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error: boolean;
  type?: ComponentProps<typeof TextField>["type"];
  "data-testid"?: string;
}

export interface FormData {
  firstStep: {
    name?: string;
    address?: string;
  };
  secondStep: {
    creditCardNum?: string;
    cvv?: number;
    expiration?: string;
  };
}

export type UpdateFormFn<Step extends keyof FormData> = (
  key: keyof FormData[Step],
  value: string | number
) => void;

export type PaymentResult = "failed" | "succeeded";
