"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericEventActionParameterType = exports.GenericEventAction = void 0;
/**
 * GenericEventAction enums
 */
var GenericEventAction;
(function (GenericEventAction) {
    // core actions
    GenericEventAction["ACTION_ACTION_LIST"] = "ACTION_ACTION_LIST";
    GenericEventAction["ACTION_NOT_IMPLEMENTED"] = "ACTION_NOT_IMPLEMENTED";
    GenericEventAction["ACTION_CONSOLE_LOG"] = "ACTION_CONSOLE_LOG";
    GenericEventAction["ACTION_ACK_OK"] = "ACTION_ACK_OK";
    GenericEventAction["ACTION_ACK_KO"] = "ACTION_ACK_KO";
    // service actions: shell
    GenericEventAction["ACTION_SYSTEM_SHELL_GENERIC_EXEC"] = "ACTION_SYSTEM_SHELL_GENERIC_EXEC";
    // disabled actions
    GenericEventAction["ACTION_SYSTEM_SERVICE_TUNNEL_ENABLE"] = "ACTION_SYSTEM_SERVICE_TUNNEL_ENABLE";
    GenericEventAction["ACTION_SYSTEM_SERVICE_TUNNEL_DISABLE"] = "ACTION_SYSTEM_SERVICE_TUNNEL_DISABLE";
    GenericEventAction["ACTION_SYSTEM_SERVICE_TUNNEL_STATUS"] = "ACTION_SYSTEM_SERVICE_TUNNEL_STATUS";
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