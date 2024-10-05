# FSM-JS

A **lightweight**, **zero-dependency**, and **easy-to-use** Finite State Machine library written in TypeScript. Manage complex application states effortlessly with a simple and intuitive API.

## Features

- **Zero Dependencies**: Integrate seamlessly without adding extra weight to your project.
- **Simple API**: Minimalistic design for quick learning and implementation.
- **Lightweight**: Small footprint, perfect for performance-critical applications.
- **TypeScript Support**: Strongly typed for safer and more predictable state management.

## Why FSM-JS?

- **Simplify Complexity**: Handle complex state logic with a clean and straightforward approach.
- **Strong Typing**: Reduce runtime errors with TypeScript's compile-time checks.
- **Flexibility**: Customize your state machine to fit any application logic.

## Usage

Define your FSM schema and create an instance:

```typescript
import { FSM, FsmSchema } from "fsm-js";

const states = ["idle", "running", "stopped"] as const;
const transitions = ["start", "stop"] as const;

const schema: FsmSchema<typeof states, typeof transitions> = {
  availableStates: states,
  initialState: "idle",
  statesEvents: {
    idle: {
      on: {
        start: { moveTo: "running" },
      },
    },
    running: {
      on: {
        stop: { moveTo: "stopped" },
      },
    },
  },
};

const fsm = new FSM<typeof states, typeof transitions>(schema);

fsm.emit("start");
console.log(fsm.currentState); // Output: 'running'

fsm.emit("stop");
console.log(fsm.currentState); // Output: 'stopped'
```

## API Overview

### Class: `FSM`

#### Constructor

```typescript
new FSM(schema: FsmSchema<States, Transitions>)
```

- **schema**: Defines the states, transitions, and initial state of the FSM.

#### Methods

- **emit(eventName: Transitions[number]): void**

  Trigger an event to transition between states.

- **subscribe(callback: (newState: States[number]) => void): void**

  Listen for state changes.

#### Properties

- **currentState: States[number]**

  Access the current state of the FSM.

## Type Definitions

### `FsmSchema`

```typescript
type FsmSchema<
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
```

## Installation

Coming soon!
