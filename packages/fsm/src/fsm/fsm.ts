import { FsmSchema } from "../types";

export class FSM<
  States extends readonly string[],
  Transitions extends readonly string[]
> {
  private _states;
  private _currentState;
  private _statesEvents;
  private subscribeCbs: ((newState: States[number]) => any)[] = [];

  constructor(schema: FsmSchema<States, Transitions>) {
    this._currentState = schema.initialState;
    this._states = schema.availableStates;
    this._statesEvents = schema.statesEvents;
  }

  public emit = (eventName: Transitions[number]) => {
    const stateEvent = this._statesEvents[this._currentState]?.on[eventName];
    const validationErr = this._validateEvent(eventName);

    if (!stateEvent || validationErr) {
      return new Error(
        `Event ${eventName} on state ${this._currentState} is invalid. Full error is: ${validationErr}`
      );
    }

    this._currentState = stateEvent.moveTo;

    this.subscribeCbs.forEach((cb) => cb(this._currentState));
  };

  public subscribe = (cb: (typeof this.subscribeCbs)[number]) => {
    this.subscribeCbs.push(cb);
  };

  public get currentState() {
    return this._currentState;
  }

  private _validateEvent = (eventName: Transitions[number]) => {
    const validations: {
      description: string;
      errorMsg: string;
      action: () => boolean;
    }[] = [
      {
        description: "validate state has events",
        errorMsg: `The state ${this._currentState} has no state events`,
        action: () => this._statesEvents[this._currentState] !== undefined,
      },
      {
        description: "validate event moveTo is a valid state",
        errorMsg: `moveTo is not a valid state: ${
          this._statesEvents[this._currentState]?.on[eventName]?.moveTo
        }`,
        action: () =>
          this._states.includes(
            this._statesEvents[this._currentState]?.on[eventName]?.moveTo ?? ""
          ),
      },
    ];

    for (const validation of validations) {
      if (!validation.action()) {
        return validation.errorMsg;
      }
    }
  };
}
