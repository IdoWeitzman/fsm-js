"use client";
import { useFSM } from "fsm-react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { PrePurchaseNote } from "./pre-purchase-note";
import {
  FillInfoForm,
  FillInfoFormProps,
  PaymentResult,
} from "./fill-info-form";
import { PurchaseComplete } from "./purchase-complete";
import { PurchaseFailed } from "./purchase-failed";
import { schema, states, transitions } from "./fsm-schema";

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
      {fsmState === "purchase-complete" && <PurchaseComplete />}
      {fsmState === "purchase-failed" && (
        <PurchaseFailed
          onBackClick={() => {
            emit("back");
          }}
        />
      )}
    </Box>
  );
};
export default PurchaseBeansPage;
