import { renderHook, act } from "@testing-library/react-hooks";
import { useFSM } from "./fsm-react";
import { FsmSchema } from "fsm-js";

describe("useFSM", () => {
  const states = ["idle", "loading", "success", "error"] as const;
  const transitions = ["start", "succeed", "fail", "reset"] as const;

  const schema: FsmSchema<typeof states, typeof transitions> = {
    availableStates: states,
    initialState: "idle",
    statesEvents: {
      idle: {
        on: {
          start: { moveTo: "loading" },
        },
      },
      loading: {
        on: {
          succeed: { moveTo: "success" },
          fail: { moveTo: "error" },
        },
      },
      success: {
        on: {
          reset: { moveTo: "idle" },
        },
      },
      error: {
        on: {
          reset: { moveTo: "idle" },
        },
      },
    },
  };

  test("should initialize with the correct initial state", () => {
    const { result } = renderHook(() => useFSM(schema));

    expect(result.current.fsmState).toBe("idle");
  });

  test("should transition to loading state when start is emitted", () => {
    const { result } = renderHook(() => useFSM(schema));

    act(() => {
      result.current.emit("start");
    });

    expect(result.current.fsmState).toBe("loading");
  });

  test("should transition to success state when succeed is emitted", () => {
    const { result } = renderHook(() => useFSM(schema));

    act(() => {
      result.current.emit("start");
      result.current.emit("succeed");
    });

    expect(result.current.fsmState).toBe("success");
  });

  test("should transition to error state when fail is emitted", () => {
    const { result } = renderHook(() => useFSM(schema));

    act(() => {
      result.current.emit("start");
      result.current.emit("fail");
    });

    expect(result.current.fsmState).toBe("error");
  });

  test("should reset to idle state when reset is emitted from success", () => {
    const { result } = renderHook(() => useFSM(schema));

    act(() => {
      result.current.emit("start");
      result.current.emit("succeed");
      result.current.emit("reset");
    });

    expect(result.current.fsmState).toBe("idle");
  });

  test("should reset to idle state when reset is emitted from error", () => {
    const { result } = renderHook(() => useFSM(schema));

    act(() => {
      result.current.emit("start");
      result.current.emit("fail");
      result.current.emit("reset");
    });

    expect(result.current.fsmState).toBe("idle");
  });

  test("should not change state on invalid transition", () => {
    const { result } = renderHook(() => useFSM(schema));

    act(() => {
      // illegal transition
      result.current.emit("succeed");
    });

    expect(result.current.fsmState).toBe("idle");
  });
});
