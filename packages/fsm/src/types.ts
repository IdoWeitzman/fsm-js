export type FsmSchema<State extends string, Transition extends string> = {
  availableStates: State[];
  initialState: State;
  statesEvents: {
    [value in State]?: {
      on: {
        [value in Transition]?: { moveTo: State };
      };
    };
  };
};
