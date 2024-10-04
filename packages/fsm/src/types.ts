export type FsmSchema<
  States extends readonly string[],
  Transitions extends readonly string[]
> = {
  availableStates: States;
  initialState: States[number];
  statesEvents: {
    [State in States[number]]?: {
      on: {
        [Transition in Transitions[number]]?: { moveTo: States[number] };
      };
    };
  };
};
