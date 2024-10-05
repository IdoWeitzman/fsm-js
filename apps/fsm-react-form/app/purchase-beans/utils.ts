import { ComponentProps } from "react";
import { FormStepper } from "./form-stepper";
import { states, transitions } from "./fsm-schema";
import { PaymentForm } from "./_purchase-beans-form/payment-form/payment-form";
import { PaymentResult } from "./_purchase-beans-form/types";
import { emitFn } from "./types";

export const stateToActiveStep: Record<
  (typeof states)[number],
  ComponentProps<typeof FormStepper>["activeStep"]
> = {
  "purchase-form-first-step": 0,
  "purchase-form-second-step": 1,
  "purchase-failed": 2,
  "purchase-complete": 2,
};

export const onPaymentHandled = (
  paymentResult: PaymentResult,
  emit: emitFn
) => {
  const paymentResultToTransition: Record<
    PaymentResult,
    (typeof transitions)[number]
  > = {
    succeeded: "payment-successfully",
    failed: "payment-error",
  };

  if (!paymentResultToTransition[paymentResult]) {
    console.warn(`unknown payment result: ${paymentResult}`);
  }

  emit(paymentResultToTransition[paymentResult]);
};
