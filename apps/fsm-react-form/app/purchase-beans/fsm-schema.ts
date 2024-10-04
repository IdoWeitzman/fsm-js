import { type FsmSchema } from "fsm-react";

export const states = [
    "pre-purchase",
    "purchase-in-progress",
    "purchase-complete",
    "purchase-failed",
  ] as const;
  
  export const transitions = [
    "started-purchase-form",
    "payment-successfully",
    "payment-error",
    "back",
  ] as const;
  
 export const schema: FsmSchema<typeof states, typeof transitions> = {
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
      "purchase-failed": {
        on: {
          back: { moveTo: "purchase-in-progress" },
        },
      },
    },
  };