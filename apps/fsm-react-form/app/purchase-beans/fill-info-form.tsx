import { OutlinedButton } from "@/components/outlined-button";
import { Box, FormGroup } from "@mui/material";
import { useState } from "react";
import { FILL_INFO_FORM_INITIAL_VALUES } from "./constants";
import { FillInfoFormFields } from "./fill-info-form-fields";

export type PaymentResult = "failed" | "succeeded";

export interface FillInfoFormProps {
  onPaymentHandled: (paymentResult: PaymentResult) => void;
  onBackClick: () => void;
}

export interface FormData {
  name?: string;
  address?: string;
  creditCardNum?: string;
  cvv?: number;
  expiration?: string;
}

export type UpdateFormFn = (
  key: keyof FormData,
  value: string | number
) => void;

export const FillInfoForm = ({
  onPaymentHandled,
  onBackClick,
}: FillInfoFormProps) => {
  const [formData, setFormData] = useState<FormData>(
    FILL_INFO_FORM_INITIAL_VALUES
  );
  const onPayClick = () => {
    // a function that mocks payment using external service.
    // it's randomly succeeds or fails.
    setTimeout(() => {
      const rand = Math.round(Math.random());

      onPaymentHandled(rand === 0 ? "failed" : "succeeded");
    }, 1000);
  };

  const updateForm: UpdateFormFn = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <Box>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <FillInfoFormFields formData={formData} updateForm={updateForm} />
      </FormGroup>
      <Box display="flex" gap={1} marginTop={2}>
        <OutlinedButton
          disabled={Object.values(formData).some((val) => !val)}
          onClick={onPayClick}
        >
          Pay
        </OutlinedButton>
        <OutlinedButton onClick={onBackClick}>Back</OutlinedButton>
      </Box>
    </Box>
  );
};
