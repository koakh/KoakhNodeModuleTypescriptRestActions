"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateActionService = void 0;
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
const generic_actions_1 = require("../generic-actions");
/**
 * serve has a base template for clientType actions actions/client-type/* and service actions actions/service/*
 */
class TemplateActionService extends action_base_class_1.ActionBaseClass {
    constructor() {
        super();
        /**
         * ACTION_${SERVICE_NAME}_SERVICE_STUB
         */
        this.genericEventActionServiceNameStub = (payload) => {
            return new Promise((_, reject) => {
                reject(new Error(generic_actions_1.NOT_IMPLEMENTED));
            });
        };
        this.initGenericEvenActionMap();
        // client type only: used this method ONLY in client types actions/client-type/*
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEvenActionMap() {
        this.genericEventActionMap = new Map([
            [types_1.GenericEventAction.ACTION_NOT_IMPLEMENTED, {
                    func: this.genericEventActionNotImplemented,
                }],
        ]);
    }
    // init local module actions into final module genericEventActionMapAll
    initGenericEventActionMapAll() {
        // combine all local module actions
        this.combineActions();
    }
}
exports.TemplateActionService = TemplateActionService;
//# sourceMappingURL=template-action-service.js.map