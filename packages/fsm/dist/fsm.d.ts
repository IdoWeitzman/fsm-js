import { FsmSchema } from "./types";
export declare class FSM<States extends readonly string[], Transitions extends readonly string[]> {
    private _states;
    private _currentState;
    private _statesEvents;
    private subscribeCbs;
    constructor(schema: FsmSchema<States, Transitions>);
    emit: (eventName: Transitions[number]) => Error | undefined;
    subscribe: (cb: (typeof this.subscribeCbs)[number]) => void;
    get currentState(): States[number];
    private _validateEvent;
}
