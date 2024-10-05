import { useEffect, useRef, useState } from "react";
import { FSM, FsmSchema } from "fsm-js";

export const useFSM = <
  States extends readonly string[],
  Transitions extends readonly string[]
>(
  schema: FsmSchema<States, Transitions>
) => {
  const FsmInstance = useRef(new FSM<States, Transitions>(schema));
  const [fsmState, setFsmState] = useState<States[number]>(
    FsmInstance.current.currentState
  );

  useEffect(() => {
    FsmInstance.current.subscribe(setFsmState);
  }, []);

  return { fsmState, emit: FsmInstance.current.emit };
};
