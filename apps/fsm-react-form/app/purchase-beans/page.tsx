"use client";
import { useFSM } from "fsm-react";
import { Box, Typography } from "@mui/material";
import { FillInfoForm } from "./_purchase-beans-form/fill-info-form/fill-info-form";
import { PurchaseComplete } from "./purchase-complete";
import { PurchaseFailed } from "./purchase-failed";
import { schema, states, transitions } from "./fsm-schema";
import { PaymentForm } from "./_purchase-beans-form/payment-form/payment-form";
import { FormStepper } from "./form-stepper";
import { onPaymentHandled, stateToActiveStep } from "./utils";
import { useState } from "react";
import { FILL_INFO_FORM_INITIAL_VALUES } from "./_purchase-beans-form/constants";
import { FormData } from "./_purchase-beans-form/types";

const PurchaseBeansPage = () => {
  const [formData, setFormData] = useState<FormData>(
    FILL_INFO_FORM_INITIAL_VALUES
  );
  const { fsmState, emit } = useFSM<typeof states, typeof transitions>(schema);

  const onBackClick = () => {
    emit("previous-step");
  };

  const onNextClick = () => {
    emit("next-step");
  };

  const handleFieldChange = <Step extends keyof FormData>(
    step: Step,
    key: keyof FormData[Step],
    value: string | number
  ) => {
    setFormData({
      ...formData,
      [step]: {
        ...formData[step],
        [key]: value,
      },
    });
  };

  return (
    <Box height="100vh" margin={3}>
      <Typography marginBottom={3} variant="h2" fontWeight={600}>
        Purchase Coffee Bean
      </Typography>

      <Box
        marginTop={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box marginBottom={4}>
          <FormStepper activeStep={stateToActiveStep[fsmState]} />
        </Box>
        {fsmState === "purchase-form-first-step" && (
          <FillInfoForm
            formData={formData.firstStep}
            onFieldChange={(key, val) =>
              handleFieldChange<"firstStep">("firstStep", key, val)
            }
            onNextClick={onNextClick}
          />
        )}
        {fsmState === "purchase-form-second-step" && (
          <PaymentForm
            formData={formData.secondStep}
            onFieldChange={(key, val) =>
              handleFieldChange<"secondStep">("secondStep", key, val)
            }
            onPaymentHandled={(paymentResult) =>
              onPaymentHandled(paymentResult, emit)
            }
            onBackClick={onBackClick}
          />
        )}
        {fsmState === "purchase-complete" && <PurchaseComplete />}
        {fsmState === "purchase-failed" && (
          <PurchaseFailed onBackClick={onBackClick} />
        )}
      </Box>
    </Box>
  );
};
export default PurchaseBeansPage;
