# FSM-React

An adapter package for integrating fsm-js into React applications.

# Installation

Coming soon!

Usage
Import the useFSM hook and define your FSM schema:

```typescript
import { useFSM, type FsmSchema } from "fsm-react";

const states = ["state1", "state2"];
const transitions = ["event1", "event2"];

const schema: FsmSchema<typeof states, typeof transitions> = {
  availableStates: states,
  initialState: "state1",
  statesEvents: {
    state1: {
      on: {
        event1: { moveTo: "state2" },
      },
    },
    state2: {
      on: {
        event2: { moveTo: "state1" },
      },
    },
  },
};

function MyComponent() {
  const { fsmState, emit } = useFSM(schema);

  return (
    <div>
      <p>Current State: {fsmState}</p>
      <button onClick={() => emit("event1")}>Trigger Event 1</button>
      <button onClick={() => emit("event2")}>Trigger Event 2</button>
    </div>
  );
}
```

In this example:

- **Define**: An FSM schema with states state1 and state2, and events event1 and event2.
- **Use**: The useFSM hook to manage the state machine within the component.
- **Access**: The fsmState for the current state and emit to trigger transitions.
- **Render**: UI elements based on the current FSM state.
