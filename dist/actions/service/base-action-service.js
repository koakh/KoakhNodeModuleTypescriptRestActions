"use strict";
/**
 * base actions for all clients
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseActionService = void 0;
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
const generic_actions_1 = require("../generic-actions");
const shell_action_service_1 = require("./shell-action-service");
class BaseActionService extends action_base_class_1.ActionBaseClass {
    constructor(getGenericEventActionKey) {
        super();
        this.getGenericEventActionKey = getGenericEventActionKey;
        /**
         * ACTION_CONSOLE_LOG
         */
        this.genericEventActionConsoleLog = (payload) => {
            return new Promise((resolve, reject) => {
                try {
                    const { body: { message } } = payload;
                    let result;
                    // execute action if message is defined, this way works with required and optional parameters
                    if (message) {
                        result = 'message sent';
                        console.log(message);
                    }
                    else {
                        result = 'message received, but not logged to console because miss optional parameter \'message\'';
                    }
                    resolve({ message: result });
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        /**
         * ACTION_ACK_OK
         */
        this.genericEventActionAckOk = (payload) => {
            return new Promise((resolve, reject) => {
                try {
                    resolve({ message: 'OK' });
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        /**
         * ACTION_ACK_KO
         */
        this.genericEventActionAckKo = (payload) => {
            return new Promise((reject) => {
                // simulate some work...
                setTimeout(() => {
                    reject(new Error(generic_actions_1.NOT_IMPLEMENTED));
                }, 2500);
            });
        };
        this.initGenericEvenActionMap();
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEvenActionMap() {
        this.genericEventActionMap = new Map([
            // test client events
            [types_1.GenericEventAction.ACTION_CONSOLE_LOG, {
                    func: this.genericEventActionConsoleLog,
                    body: {
                        required: true,
                        description: 'just a test console log action',
                        example: `body: {'pwd'} | body: {['pwd', 'ls -la']}`
                    }
                }],
            [types_1.GenericEventAction.ACTION_ACK_OK, {
                    func: this.genericEventActionAckOk
                }],
            [types_1.GenericEventAction.ACTION_ACK_KO, {
                    func: this.genericEventActionAckKo
                }],
        ]);
    }
    // init local module actions into final module genericEventActionMapAll
    initGenericEventActionMapAll() {
        // ShellService: service component actions: push SocketGenericActionsShellService service component
        const actionsShell = new shell_action_service_1.ShellActionService();
        this.genericEventActionMapArray.push(actionsShell.getActions());
        // combine all local module actions
        this.combineActions();
    }
}
exports.BaseActionService = BaseActionService;
//# sourceMappingURL=base-action-service.js.map