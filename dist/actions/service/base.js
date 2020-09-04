"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGenericActionsBaseService = void 0;
const typescript_simple_logger_1 = require("@koakh/typescript-simple-logger");
const app_1 = require("../../../app");
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
const socket_generic_actions_1 = require("../socket-generic-actions");
class SocketGenericActionsBaseService extends action_base_class_1.ActionBaseClass {
    constructor(syncthingClient, socketClient, getGenericEventActionKey) {
        super();
        this.syncthingClient = syncthingClient;
        this.socketClient = socketClient;
        this.getGenericEventActionKey = getGenericEventActionKey;
        /**
         * ACTION_CLIENT_STATUS
         */
        this.genericEventActionClientStatus = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                // get extendedSocketProperties
                const connected = this.syncthingClient.getConnectState();
                const socketProperties = this.socketClient.getExtendedSocketProperties();
                // always init connected property with current value if not exists
                if (socketProperties && !socketProperties.syncthing) {
                    socketProperties.syncthing = {};
                }
                // if not connected or don't have property
                if (!connected || !('connected' in socketProperties.syncthing)) {
                    // delete all properties except connected
                    socketProperties.syncthing = { connected };
                }
                else {
                    // if connected and don't syncthingData, we required to refresh/re-assign new data,
                    // maybe socketClient was connected to syncthing after initSyncthingData on socket-client bootstrap
                    if (!socketProperties.syncthing.deviceId) {
                        socketProperties.syncthing = yield this.syncthingClient.getExtendedProperties();
                        this.socketClient.initSyncthingData();
                    }
                    socketProperties.syncthing.connected = connected;
                }
                // execute action
                if (callback) {
                    callback(null, { socketProperties });
                }
            }
            catch (error) {
                if (callback) {
                    callback(error, null);
                }
            }
        });
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
                    app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, message);
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
                callback(socket_generic_actions_1.NOT_IMPLEMENTED, null);
            }, 2500);
        };
        this.initGenericEvenActionMap();
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEvenActionMap() {
        this.genericEventActionMap = new Map([
            [types_1.GenericEventAction.ACTION_CLIENT_STATUS, {
                    func: this.genericEventActionClientStatus
                }],
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
exports.SocketGenericActionsBaseService = SocketGenericActionsBaseService;
//# sourceMappingURL=base.js.map