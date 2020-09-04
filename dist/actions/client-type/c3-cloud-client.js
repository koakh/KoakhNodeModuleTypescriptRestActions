"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGenericActionsC3CloudClient = void 0;
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
const shell_1 = require("../service/shell");
const syncthing_cloud_1 = require("../service/syncthing-cloud");
const system_1 = require("../service/system");
class SocketGenericActionsC3CloudClient extends action_base_class_1.ActionBaseClass {
    constructor(syncthingClient) {
        super();
        this.syncthingClient = syncthingClient;
        this.initGenericEvenActionMap();
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEvenActionMap() {
        this.genericEventActionMap = new Map([
            [types_1.GenericEventAction.ACTION_CLIENT_TYPE_C3_CLOUD_CLIENT_STUB, {
                    func: this.genericEventActionNotImplemented
                }],
        ]);
    }
    // init local module actions into final module genericEventActionMapAll
    initGenericEventActionMapAll() {
        // Syncthing: service component actions: push SocketGenericActionsSyncthingCloud service component
        const actionsSyncthingClient = new syncthing_cloud_1.SocketGenericActionsSyncthingCloudService(this.syncthingClient);
        this.genericEventActionMapArray.push(actionsSyncthingClient.getActions());
        // ShellService: service component actions: push SocketGenericActionsShellService service component
        const actionsShell = new shell_1.SocketGenericActionsShellService();
        this.genericEventActionMapArray.push(actionsShell.getActions());
        // SystemService: service component actions: push SocketGenericActionsShellService service component
        const systemActions = new system_1.SocketGenericActionsSystemService();
        this.genericEventActionMapArray.push(systemActions.getActions());
        // combine all actions for this client type
        this.combineActions();
    }
}
exports.SocketGenericActionsC3CloudClient = SocketGenericActionsC3CloudClient;
//# sourceMappingURL=c3-cloud-client.js.map