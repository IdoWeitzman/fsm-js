import { OutlinedButton } from "@/components/outlined-button";
import { Box, FormGroup } from "@mui/material";
import { PaymentFormFields } from "./payment-form-fields";
import { FormData, UpdateFormFn } from "../types";

export type PaymentResult = "failed" | "succeeded";

export interface FillInfoFormProps {
  onPaymentHandled: (paymentResult: PaymentResult) => void;
  onBackClick: () => void;
  onFieldChange: UpdateFormFn<"secondStep">;
  formData: FormData["secondStep"];
}

export const PaymentForm = ({
  onPaymentHandled,
  onBackClick,
  onFieldChange,
  formData,
}: FillInfoFormProps) => {
  const onPayClick = () => {
    // a function that mocks payment using external service.
    // it's randomly succeeds or fails.
    setTimeout(() => {
      const rand = Math.round(Math.random());

      onPaymentHandled(rand === 0 ? "failed" : "succeeded");
    }, 1000);
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
        <PaymentFormFields formData={formData} updateForm={onFieldChange} />
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
