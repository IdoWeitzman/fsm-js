import { FsmSchema } from "../../src/fsm/types";

class FSM<Schema extends FsmSchema<string, string>> {
  private _states;
  private _currentState;
  private _statesEvents;

  constructor(schema: Schema) {
    this._currentState = schema.initialState;
    this._states = schema.availableStates;
    this._statesEvents = schema.statesEvents;
  }

  //TODO: find a way to type eventName properly
  public emit =  (eventName: string) => {
    const stateEvent = this._statesEvents[this._currentState]?.on[eventName];
    const validationErr = this._validateEvent(eventName);

    if(!stateEvent || validationErr) {
        return new Error(
            `Event ${eventName} on state ${this._currentState} is invalid. Full error is: ${validationErr}`
        );    
    }

    this._currentState = stateEvent.moveTo;
  };

  //TODO: find  way to type eventName properly
  private _validateEvent = (eventName: string) => {
    const validations: {
      description: string;
      errorMsg: string;
      action: () => boolean;
    }[] = [
      {
        description: "validate state has events",
        errorMsg: `The state ${this._currentState} has no state events`,
        action: () => this._statesEvents[this._currentState] !== undefined;
      },
      {
        description: "validate event moveTo is a valid state",
        errorMsg: `moveTo is not a valid state: ${
          this._statesEvents[this._currentState]?.on[eventName]?.moveTo
        }`,
        action: () =>
          this._states.includes(
            this._statesEvents[this._currentState]?.on[eventName]?.moveTo ?? ''
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
