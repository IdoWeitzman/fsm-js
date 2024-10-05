import { transitions } from "./fsm-schema";

export type emitFn = (
  eventName: (typeof transitions)[number]
) => Error | undefined;
