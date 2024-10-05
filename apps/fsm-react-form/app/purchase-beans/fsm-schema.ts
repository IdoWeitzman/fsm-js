import { type FsmSchema } from "fsm-react";

export const states = [
  "purchase-form-first-step",
  "purchase-form-second-step",
  "purchase-failed",
  "purchase-complete",
] as const;

export const transitions = [
  "next-step",
  "previous-step",
  "payment-successfully",
  "payment-error",
] as const;

export const schema: FsmSchema<typeof states, typeof transitions> = {
  initialState: "purchase-form-first-step",
  availableStates: states,
  statesEvents: {
    "purchase-form-first-step": {
      on: {
        "next-step": { moveTo: "purchase-form-second-step" },
      },
    },
    "purchase-form-second-step": {
      on: {
        "payment-successfully": { moveTo: "purchase-complete" },
        "payment-error": { moveTo: "purchase-failed" },
        "previous-step": { moveTo: "purchase-form-first-step" },
      },
    },
    "purchase-failed": {
      on: {
        "previous-step": { moveTo: "purchase-form-second-step" },
      },
    },
  },
};
