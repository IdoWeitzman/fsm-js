"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const fsm_js_1 = require("fsm-js");
const react_1 = require("react");
const states = [
    "pre-purchase",
    "purchase-in-progress",
    "purchase-complete",
    "purchase-failed",
];
const transitions = [
    "started-purchase-form",
    "payment-successfully",
    "payment-error",
];
function Home() {
    const CoffeeBeansShopFsm = new fsm_js_1.FSM({
        initialState: "pre-purchase",
        availableStates: states,
        statesEvents: {
            "pre-purchase": {
                on: { "started-purchase-form": { moveTo: "purchase-in-progress" } },
            },
            "purchase-in-progress": {
                on: {
                    "payment-successfully": { moveTo: "purchase-complete" },
                    "payment-error": { moveTo: "purchase-failed" },
                },
            },
        },
    });
    CoffeeBeansShopFsm.subscribe((newState) => console.log("new state is", newState));
    console.log("hi");
    (0, react_1.useEffect)(() => {
        console.log("current state is", CoffeeBeansShopFsm.currentState);
    }, [CoffeeBeansShopFsm.currentState]);
    return (<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      current state is: {CoffeeBeansShopFsm.currentState}
      <button onClick={() => {
            CoffeeBeansShopFsm.emit("started-purchase-form");
        }}>
        Click
      </button>
    </div>);
}
