"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGenericActionsCcSocketClient = void 0;
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
class SocketGenericActionsCcSocketClient extends action_base_class_1.ActionBaseClass {
    constructor() {
        super();
        this.initGenericEvenActionMap();
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEvenActionMap() {
        this.genericEventActionMap = new Map([
            [types_1.GenericEventAction.ACTION_CLIENT_TYPE_CC_SOCKET_CLIENT_STUB, {
                    func: this.genericEventActionNotImplemented
                }],
        ]);
    }
    // init local module actions into final module genericEventActionMapAll
    initGenericEventActionMapAll() {
        // combine all local module actions
        this.combineActions();
    }
}
exports.SocketGenericActionsCcSocketClient = SocketGenericActionsCcSocketClient;
//# sourceMappingURL=cc-socket-client.js.map