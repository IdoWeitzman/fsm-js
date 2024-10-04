import { FsmSchema } from "fsm-js";
export declare const useFSM: <States extends readonly string[], Transitions extends readonly string[]>(schema: FsmSchema<States, Transitions>) => {
    fsmState: States[number];
    emit: (eventName: Transitions[number]) => Error | undefined;
};
