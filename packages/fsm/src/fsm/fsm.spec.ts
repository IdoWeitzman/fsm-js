import { FSM } from "./fsm";
import { FsmSchema } from "../types";

const mockSchema = {
  initialState: "idle",
  availableStates: ["idle", "loading", "success", "error"],
  statesEvents: {
    idle: { on: { START: { moveTo: "loading" } } },
    loading: {
      on: { SUCCESS: { moveTo: "success" }, FAIL: { moveTo: "error" } },
    },
    success: { on: {} },
    error: { on: {} },
  },
};

describe("fsm", () => {
  let fsm: FSM<any, any>;

  beforeEach(() => {
    fsm = new FSM(mockSchema as FsmSchema<any, any>);
  });

  it("should initialize with the correct initial state", () => {
    expect(fsm.currentState).toBe("idle");
  });

  describe("state handling", () => {
    it("should allow valid state transition", () => {
      fsm.emit("START");
      expect(fsm.currentState).toBe("loading");
    });

    it("should return an error for invalid event in the current state", () => {
      const result = fsm.emit("SUCCESS"); // no SUCCESS from idle state
      expect(result).toBeInstanceOf(Error);
      expect(result?.message).toContain(
        "Event SUCCESS on state idle is invalid"
      );
    });

    it("should not transition to an invalid state", () => {
      const mockInvalidSchema = {
        ...mockSchema,
        statesEvents: {
          idle: { on: { START: { moveTo: "invalidState" } } },
        },
      };

      const invalidFSM = new FSM(mockInvalidSchema);
      const result = invalidFSM.emit("START");
      expect(result).toBeInstanceOf(Error);
      expect(result?.message).toContain("moveTo is not a valid state");
    });

    it("should transition through multiple valid states", () => {
      fsm.emit("START");
      expect(fsm.currentState).toBe("loading");

      fsm.emit("SUCCESS");
      expect(fsm.currentState).toBe("success");
    });

    it("should transition to an error state on failure", () => {
      fsm.emit("START");
      expect(fsm.currentState).toBe("loading");

      fsm.emit("FAIL");
      expect(fsm.currentState).toBe("error");
    });

    it("should not allow invalid event transitions in any state", () => {
      fsm.emit("START");
      expect(fsm.currentState).toBe("loading");

      const result = fsm.emit("START"); // can't START from loading
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe("subscribe", () => {
    it("should receive state changes", () => {
      const callback = jest.fn();
      fsm.subscribe(callback);

      fsm.emit("START");
      expect(callback).toHaveBeenCalledWith("loading");
    });
  });
});
