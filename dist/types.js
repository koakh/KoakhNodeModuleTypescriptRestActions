"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericEventActionParameterType = exports.GenericEventAction = void 0;
/**
 * This actions will use SocketEvent.CLIENT_CHANNEL
 * GenericEventAction enum is duplicated in server and all clients
 * but each server|client has its own specific enums that are implemented
 */
var GenericEventAction;
(function (GenericEventAction) {
    // core actions
    GenericEventAction["ACTION_NOT_IMPLEMENTED"] = "ACTION_NOT_IMPLEMENTED";
    GenericEventAction["ACTION_CLIENT_STATUS"] = "ACTION_CLIENT_STATUS";
    GenericEventAction["ACTION_ACTION_LIST"] = "ACTION_ACTION_LIST";
    GenericEventAction["ACTION_CONSOLE_LOG"] = "ACTION_CONSOLE_LOG";
    GenericEventAction["ACTION_ACK_OK"] = "ACTION_ACK_OK";
    GenericEventAction["ACTION_ACK_KO"] = "ACTION_ACK_KO";
    // service actions: shell
    GenericEventAction["ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC"] = "ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC";
    // disabled actions
    GenericEventAction["ACTION_SHELL_SERVICE_ENABLE_TUNNELS"] = "ACTION_SHELL_SERVICE_ENABLE_TUNNELS";
    GenericEventAction["ACTION_SHELL_SERVICE_DISABLE_TUNNELS"] = "ACTION_SHELL_SERVICE_DISABLE_TUNNELS";
    GenericEventAction["ACTION_SHELL_SERVICE_TUNNELS_STATUS"] = "ACTION_SHELL_SERVICE_TUNNELS_STATUS";
})(GenericEventAction = exports.GenericEventAction || (exports.GenericEventAction = {}));
var GenericEventActionParameterType;
(function (GenericEventActionParameterType) {
    GenericEventActionParameterType["STRING"] = "string";
    GenericEventActionParameterType["NUMBER"] = "number";
    GenericEventActionParameterType["ARRAY"] = "array";
    GenericEventActionParameterType["OBJECT"] = "object";
    GenericEventActionParameterType["ACTION"] = "action";
})(GenericEventActionParameterType = exports.GenericEventActionParameterType || (exports.GenericEventActionParameterType = {}));
//# sourceMappingURL=types.js.map