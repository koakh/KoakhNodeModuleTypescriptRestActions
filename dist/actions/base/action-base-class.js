"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBaseClass = void 0;
const generic_actions_1 = require("../generic-actions");
class ActionBaseClass {
    constructor() {
        this.genericEventActionMap = new Map();
        this.genericEventActionMapArray = [];
        this.genericEventActionMapAll = new Map();
        // common function to test actions
        this.genericEventActionNotImplemented = (payload) => {
            return new Promise((reject) => {
                reject(new Error(generic_actions_1.NOT_IMPLEMENTED));
            });
        };
    }
    getActions() {
        // return combined all
        return this.genericEventActionMapAll;
    }
    combineActions() {
        // unshift local genericEventActionMap into first position
        this.genericEventActionMapArray.unshift(this.genericEventActionMap);
        // now combine all actions into final genericEventActionMapAll
        this.genericEventActionMapArray.forEach((e) => {
            this.genericEventActionMapAll = new Map([
                // local map
                ...Array.from(this.genericEventActionMapAll.entries()),
                // iterate map
                ...Array.from(e)
            ]);
        });
    }
}
exports.ActionBaseClass = ActionBaseClass;
//# sourceMappingURL=action-base-class.js.map