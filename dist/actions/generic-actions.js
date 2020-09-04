"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericActions = exports.MISSING_BODY = exports.MISSING_PARAMETERS = exports.NOT_IMPLEMENTED = void 0;
// tslint:disable-next-line: max-line-length
const types_1 = require("../types");
const main_1 = require("../util/main");
const generic_actions_base_service_1 = require("./service/generic-actions-base-service");
exports.NOT_IMPLEMENTED = 'current action is registered, but is not implemented! please implement a valid GenericEventActionFunction for it';
exports.MISSING_PARAMETERS = 'missing query parameter(s)';
exports.MISSING_BODY = 'missing payload body';
/**
 * common generic Actions file, to manage actions for all types
 */
class GenericActions {
    constructor() {
        // array of action map to combine into final genericEventActionMapAll
        this.genericEventActionMapArray = [];
        // combined version of local genericEventActionMap, and all actions for current socketClientType
        this.genericEventActionMapAll = new Map();
        /**
         * ACTION_ACTION_LIST
         */
        this.genericEventActionActionList = (payload, callback) => {
            // all parameters are optional, we must first declare variables, and check empty payload.query
            let action;
            if (payload && 'body' in payload) {
                // there is no need to type destruct, we already type it in let
                ({ action } = payload.body);
            }
            // check if is a valid action
            let genericEventAction;
            if (action) {
                // start getting GenericEventAction enum
                genericEventAction = this.getGenericEventActionKey(action);
                if (!genericEventAction) {
                    throw new Error(`Invalid action key '${action}'! Valid actions are ${Object.keys(types_1.GenericEventAction)}`);
                }
            }
            try {
                const actionsPayload = [];
                // convert to array, and iterate over the entries
                Array.from(this.genericEventActionMapAll.entries())
                    .forEach((entry) => {
                    // key: GenericEventAction, value:GenericEventActionFunction
                    const key = entry[0];
                    // inline destruct type entry[1]
                    const { func, description, link, parameters, body, disabled } = entry[1];
                    // App.log(LogLevel.DEBUG, `key: ${key}, disabled: ${disabled}`);
                    // only add action if defined and not disabled, ex implemented, else we skip method to prevent un-implemented actions in list
                    // and if action is defined and equal to payload action
                    if (!disabled && ((func && !genericEventAction) || (func && genericEventAction && genericEventAction === key))) {
                        // clean up parameter array item and add a name parameter ex
                        // from: { "parameters": [ [ "action", { "required": false, "type": "action", "description": "action ex.: ACTION_CLIENT_STATUS" } ] ] }
                        //   to: { "parameters": [ [ { "name": "action", "required": false, "type": "action", "description": "action ex.: ACTION_CLIENT_STATUS" } ] ] }
                        let paramList;
                        if (parameters && parameters.size > 0) {
                            paramList = Array.from(parameters.entries()).map(p => {
                                const parameterName = p[0];
                                // inject parameterName as a property `name`
                                p[1].name = parameterName;
                                return p[1];
                            });
                        }
                        actionsPayload.push({
                            action: key,
                            description: (description) ? description : undefined,
                            link: (link) ? link : undefined,
                            parameters: paramList,
                            body: (body) ? body : undefined,
                        });
                    }
                });
                // execute action
                if (callback) {
                    callback(null, actionsPayload);
                }
            }
            catch (error) {
                if (callback) {
                    callback(error, null);
                }
            }
        };
        /**
         * check if is a valid GenericEventAction and is is implemented in genericEventActionMap
         * returns GenericEventAction or null if invalid/ or not implemented in genericEventActionMap
         * @param action the action that was sent in CLIENT_CHANNEL payload
         */
        this.getGenericEventActionKey = (action) => {
            try {
                // check if valid enum / getEnumKeyFromEnumValue throws an exception if not
                const eventAction = main_1.getEnumKeyFromEnumValue(types_1.GenericEventAction, action);
                // check if valid enum and if is implemented in genericEventActionMap
                if (eventAction && this.genericEventActionMapAll.has(eventAction)) {
                    return eventAction;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                return null;
            }
        };
    }
    /**
     * processAction, this function will work with all implemented generic function actions,
     * receive action, payload and socket server callback
     * and send acknowledge response to socket server using the magic callback stuff (I like it too)
     * @param action arbitrary string action, must be a valid GenericEventAction and have a valid implementation of GenericEventActionFunction
     * @param callback socket server callback
     */
    processAction(action, payload, callback) {
        try {
            // start getting GenericEventAction enum
            const genericEventAction = this.getGenericEventActionKey(action);
            // get actionMapObject from genericEventActionMapAll
            const actionMapObject = this.genericEventActionMapAll.get(genericEventAction);
            if (action && genericEventAction && actionMapObject && !actionMapObject.disabled) {
                // get function implementation
                const actionFunction = actionMapObject.func;
                // get parameters
                const parameters = actionMapObject.parameters;
                // validate parameters, if action has parameters defined
                if (parameters) {
                    this.validateParameters(payload, parameters, callback);
                }
                // validate body, check if has body is a required property, and if payload has body property
                if ((actionMapObject && actionMapObject.body && actionMapObject.body.required) && (!payload || (payload && !payload.body))) {
                    // delegate to catch
                    const bodyExample = (actionMapObject.body.example) ? `. ex.: { body: ${actionMapObject.body.example} }` : '.';
                    throw new Error(`${exports.MISSING_BODY}${bodyExample}`);
                }
                // fire actionFunction if pass validateParameters, and validateBody
                if (actionFunction) {
                    // call actionFunction implementation
                    actionFunction(payload, callback);
                }
                else {
                    // delegate to catch
                    throw new Error(`invalid genericEventActionFunction implementation for action '${action}'`);
                }
            }
            else {
                // delegate to catch
                throw new Error(`invalid or disabled action '${action}' or payload...please check if target action is implemented in client, or is not disabled`);
            }
        }
        catch (error) {
            // always fire callback for server acknowledge
            callback(error.message, null);
        }
    }
    initGenericEventActionMapAll() {
        debugger;
        // declare local action, the ACTION_ACTION_LIST must be implemented here to access the final genericEventActionMapAll object in actionList
        const genericEventActionMap = new Map([
            [types_1.GenericEventAction.ACTION_ACTION_LIST, {
                    func: this.genericEventActionActionList,
                    parameters: new Map([
                        ['action', { required: false, type: types_1.GenericEventActionParameterType.ACTION, description: 'action ex.: ACTION_CLIENT_STATUS' }],
                    ]),
                }],
        ]);
        // common actions for all clients: push local genericEventActionMap
        this.genericEventActionMapArray.push(genericEventActionMap);
        // common actions for all clients: push SocketGenericActionsBaseService service component
        const actionsBase = new generic_actions_base_service_1.GenericActionsBaseService(this.getGenericEventActionKey);
        this.genericEventActionMapArray.push(actionsBase.getActions());
        // do some magic and combine actions in genericEventActionMapArray into final genericEventActionMapAll, the one that is used
        // and finish the combination of local, common, and specific clientTypes actions
        this.genericEventActionMapArray.forEach((e) => {
            this.genericEventActionMapAll = new Map([
                // local map
                ...Array.from(this.genericEventActionMapAll.entries()),
                // iterate map
                ...Array.from(e)
            ]);
        });
    }
    /**
     * common function to validate ACTION PAYLOAD, payload and query parameters
     */
    validateParameters(payload, parameters, callback) {
        let parametersDisplay = [];
        const parametersArray = Array.from(parameters.entries());
        let haveRequiredParameters = false;
        parametersArray.forEach((parameter) => {
            parametersDisplay.push(`${parameter[0]}${(parameter[1].required) ? '[required]' : '[optional]'}`);
            // assign to true one time only
            if (!haveRequiredParameters && parameter[1].required) {
                haveRequiredParameters = true;
            }
        });
        if (!haveRequiredParameters) {
            return;
        }
        else if (payload && payload.query && Object.keys(payload.query).length > 0) {
            // check parameters
            let valid = true;
            // reset parametersDisplay
            parametersDisplay = [];
            parametersArray.forEach((parameter) => {
                const value = payload.query[parameter[0]];
                const required = parameters.get(parameter[0]).required;
                // validate
                if (required && !value) {
                    parametersDisplay.push(`${parameter[0]} [required]`);
                    valid = false;
                }
            });
            // check if valid, else show only miss required fields
            if (!valid) {
                throw new Error(`${exports.MISSING_PARAMETERS}: ${parametersDisplay.join(', ')}.`);
            }
        }
        else {
            // throw all fields, optional and required
            throw new Error(`${exports.MISSING_PARAMETERS}: ${parametersDisplay.join(', ')}.`);
        }
    }
}
exports.GenericActions = GenericActions;
//# sourceMappingURL=generic-actions.js.map