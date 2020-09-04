"use strict";
/**
 * base actions for all clients
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericActionsBaseService = void 0;
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
const generic_actions_1 = require("../generic-actions");
class GenericActionsBaseService extends action_base_class_1.ActionBaseClass {
    constructor(getGenericEventActionKey) {
        super();
        this.getGenericEventActionKey = getGenericEventActionKey;
        /**
         * ACTION_CONSOLE_LOG
         */
        this.genericEventActionConsoleLog = (payload, callback) => {
            const { body: { message } } = payload;
            try {
                let result;
                // execute action if message is defined, this way works with required and optional parameters
                if (message) {
                    result = 'message sent';
                    console.log(message);
                }
                else {
                    result = 'message received, but not logged to console because miss optional parameter \'message\'';
                }
                // response to server
                if (callback) {
                    callback(null, { message: result });
                }
            }
            catch (error) {
                if (callback) {
                    callback(error, null);
                }
            }
        };
        /**
         * ACTION_ACK_OK
         */
        this.genericEventActionAckOk = (payload, callback) => {
            try {
                // simulate some work...
                setTimeout(() => {
                    callback(null, { message: 'OK' });
                }, 1000);
            }
            catch (error) {
                callback(error, null);
            }
        };
        /**
         * ACTION_ACK_KO
         */
        this.genericEventActionAckKo = (payload, callback) => {
            // simulate some work...
            setTimeout(() => {
                callback(generic_actions_1.NOT_IMPLEMENTED, null);
            }, 2500);
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
        // combine all local module actions
        this.combineActions();
    }
}
exports.GenericActionsBaseService = GenericActionsBaseService;
//# sourceMappingURL=generic-actions-base-service.js.map