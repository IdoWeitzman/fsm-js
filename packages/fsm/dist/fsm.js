"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSM = void 0;
class FSM {
    constructor(schema) {
        this.subscribeCbs = [];
        //TODO: find a way to type eventName properly
        this.emit = (eventName) => {
            var _a;
            const stateEvent = (_a = this._statesEvents[this._currentState]) === null || _a === void 0 ? void 0 : _a.on[eventName];
            const validationErr = this._validateEvent(eventName);
            if (!stateEvent || validationErr) {
                return new Error(`Event ${eventName} on state ${this._currentState} is invalid. Full error is: ${validationErr}`);
            }
            this._currentState = stateEvent.moveTo;
            this.subscribeCbs.forEach((cb) => cb(this._currentState));
        };
        this.subscribe = (cb) => {
            this.subscribeCbs.push(cb);
        };
        //TODO: find  way to type eventName properly
        this._validateEvent = (eventName) => {
            var _a, _b;
            const validations = [
                {
                    description: "validate state has events",
                    errorMsg: `The state ${this._currentState} has no state events`,
                    action: () => this._statesEvents[this._currentState] !== undefined,
                },
                {
                    description: "validate event moveTo is a valid state",
                    errorMsg: `moveTo is not a valid state: ${(_b = (_a = this._statesEvents[this._currentState]) === null || _a === void 0 ? void 0 : _a.on[eventName]) === null || _b === void 0 ? void 0 : _b.moveTo}`,
                    action: () => {
                        var _a, _b, _c;
                        return this._states.includes((_c = (_b = (_a = this._statesEvents[this._currentState]) === null || _a === void 0 ? void 0 : _a.on[eventName]) === null || _b === void 0 ? void 0 : _b.moveTo) !== null && _c !== void 0 ? _c : "");
                    },
                },
            ];
            for (const validation of validations) {
                if (!validation.action()) {
                    return validation.errorMsg;
                }
            }
        };
        this._currentState = schema.initialState;
        this._states = schema.availableStates;
        this._statesEvents = schema.statesEvents;
    }
    get currentState() {
        return this._currentState;
    }
}
exports.FSM = FSM;
