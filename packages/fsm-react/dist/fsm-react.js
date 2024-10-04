"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFSM = void 0;
const react_1 = require("react");
const fsm_js_1 = require("fsm-js");
const useFSM = (schema) => {
    const FsmInstance = (0, react_1.useRef)(new fsm_js_1.FSM(schema));
    const [fsmState, setFsmState] = (0, react_1.useState)(FsmInstance.current.currentState);
    (0, react_1.useEffect)(() => {
        FsmInstance.current.subscribe(setFsmState);
    }, []);
    return { fsmState, emit: FsmInstance.current.emit };
};
exports.useFSM = useFSM;
