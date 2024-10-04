"use client";
import { type FsmSchema, useFSM } from "fsm-react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { PrePurchaseNote } from "./pre-purchase-note";
import {
  FillInfoForm,
  FillInfoFormProps,
  PaymentResult,
} from "./fill-info-form";
import { OutlinedButton } from "@/components/outlined-button";

const states = [
  "pre-purchase",
  "purchase-in-progress",
  "purchase-complete",
  "purchase-failed",
] as const;

const transitions = [
  "started-purchase-form",
  "payment-successfully",
  "payment-error",
  "back",
] as const;

const schema: FsmSchema<typeof states, typeof transitions> = {
  initialState: "pre-purchase",
  availableStates: states,
  statesEvents: {
    "pre-purchase": {
      on: { "started-purchase-form": { moveTo: "purchase-in-progress" } },
    },
    "purchase-in-progress": {
      on: {
        "payment-successfully": { moveTo: "purchase-complete" },
        "payment-error": { moveTo: "purchase-failed" },
        back: { moveTo: "pre-purchase" },
      },
    },
    "purchase-complete": {
      on: {
        back: { moveTo: "purchase-in-progress" },
      },
    },
    "purchase-failed": {
      on: {
        back: { moveTo: "purchase-in-progress" },
      },
    },
  },
};

const PurchaseBeansPage = () => {
  const { fsmState, emit } = useFSM<typeof states, typeof transitions>(schema);
  const router = useRouter();

  const onPaymentHandled: FillInfoFormProps["onPaymentHandled"] = (
    paymentResult
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

  const onBackClick = () => {
    emit("back");
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {fsmState === "pre-purchase" && (
        <PrePurchaseNote
          onAckClick={() => {
            emit("started-purchase-form");
          }}
          onRejectClick={() => {
            router.back();
          }}
        />
      )}
      {fsmState === "purchase-in-progress" && (
        <FillInfoForm
          onPaymentHandled={onPaymentHandled}
          onBackClick={onBackClick}
        />
      )}
      {fsmState === "purchase-complete" && (
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography>Payment Success</Typography>
          <OutlinedButton onClick={() => emit("back")}>Back</OutlinedButton>
        </Box>
      )}
      {fsmState === "purchase-failed" && (
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography>Payment Failed</Typography>
          <OutlinedButton onClick={() => emit("back")}>Back</OutlinedButton>
        </Box>
      )}
    </Box>
  );
};
export default PurchaseBeansPage;
