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
exports.SocketGenericActionsSyncthingCloudService = void 0;
const typescript_simple_logger_1 = require("@koakh/typescript-simple-logger");
const child_process_1 = require("child_process");
const app_1 = require("../../../app");
const util_1 = require("../../../util");
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
const socket_generic_actions_1 = require("../socket-generic-actions");
class SocketGenericActionsSyncthingCloudService extends action_base_class_1.ActionBaseClass {
    constructor(syncthingClient) {
        super();
        this.syncthingClient = syncthingClient;
        /**
         * ACTION_SYNCTHING_RESTART_SERVICE
         */
        this.genericEventActionSyncthingRestartService = (payload, callback) => {
            // always fire response back
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, '{Cloud_Action} Restart Syncthing daemon');
            child_process_1.exec('systemctl restart syncthing@syncthing ', (err, stdout, stderr) => {
                if (err || stderr) {
                    app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, `{Cloud_Action} Restart Syncthing daemon - error result - ${JSON.stringify(err)} - ${JSON.stringify(stderr)}`);
                    callback({ err, stderr }, null);
                }
                else {
                    app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, `{Cloud_Action} Restart Syncthing daemon - stdout result - ${JSON.stringify(stdout)}`);
                    callback(null, stdout);
                }
            });
        };
        /**
         * ACTION_C3_CLOUD_CLIENT_RESTART_SERVICE
         */
        this.genericEventActionC3CloudClientRestartService = (payload, callback) => {
            // always fire response back
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, '{Cloud_Action} Restart c3-cloud-client daemon');
            child_process_1.exec('systemctl restart c3-cloud-client ', (err, stdout, stderr) => {
                if (err || stderr) {
                    app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, `{Cloud_Action} Restart c3-cloud-client daemon - error result - ${JSON.stringify(err)} - ${JSON.stringify(stderr)}`);
                    callback({ err, stderr }, null);
                }
                else {
                    app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, `{Cloud_Action} Restart c3-cloud-client daemon - stdout result - ${JSON.stringify(stdout)}`);
                    callback(null, stdout);
                }
            });
        };
        /**
         * ACTION_SYNCTHING_CLOUD_CUSTOM_SETTINGS_SET
         */
        this.genericEventActionSyncthingCloudSettingsSet = (payload, callback) => {
            // always fire response back
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, '{Cloud_Action} Set C3 syncthing settings');
            this.syncthingClient.setC3syncthingSettings(payload.body);
            callback(null, null);
        };
        /**
         * ACTION_SYNCTHING_CLOUD_UPDATED_CONTENTS
         */
        this.genericEventActionSyncthingCloudUpdatedContents = (payload, callback) => {
            // always fire response back
            callback(socket_generic_actions_1.NOT_IMPLEMENTED, null);
        };
        /**
         * ACTION_SYNCTHING_CLOUD_CONTENT_UPDATE
         */
        this.genericEventActionSyncthingCloudContentUpdate = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, '{Cloud_Action} Content metadata update');
            const content = payload.body || null;
            if (!content || !content.name || !content.folderId) {
                return callback(socket_generic_actions_1.MISSING_BODY, null);
            }
            const result = yield util_1.backendRequest('PUT', `/cloudcontrol/contents/${content.folderId}`, { content })
                .catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.ERROR, `PUT content - backend - ${JSON.stringify(err)}`));
            console.log('update one content result', result);
            return callback(null, result);
        });
        /**
         * ACTION_SYNCTHING_CLOUD_CONTENT_SUMMARIES
         */
        this.genericEventActionSyncthingCloudContentSummaries = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, '{Cloud_Action} Get and Update contents summaries');
            const config = yield this.syncthingClient.getConfig();
            this.syncthingClient.closeConfig();
            if (!config)
                return callback('Could not get config', null);
            if (!config.folders || !config.folders.length)
                return callback('Could not get config folders', null);
            const promises = config.folders.map(f => this.syncthingClient.getInstance().db.status(f.id));
            const results = yield Promise.all(promises).catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.ERROR, `ACTION_SYNCTHING_CLOUD_CONTENT_SUMMARIES err=${err}`));
            // convert results to readable CloudSummaries
            return callback(null, results);
        });
        /**
         * ACTION_SYNCTHING_SUMMARIES
         */
        this.genericEventActionSyncthingSummaries = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, '{Cloud_Action} Get content summaries');
            const config = yield this.syncthingClient.getConfig();
            this.syncthingClient.closeConfig();
            if (!config)
                return callback('Could not get config', null);
            if (!config.folders || !config.folders.length)
                return callback('Could not get config folders', null);
            const promises = config.folders.map(f => this.syncthingClient.getInstance().db.status(f.id));
            const results = yield Promise.all(promises).catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.ERROR, `ACTION_SYNCTHING_SUMMARIES err=${err}`));
            // convert results to readable CloudSummaries
            if (results && results.length) {
                const summaries = results.map((summary, index) => {
                    const folder = config.folders[index].id;
                    const { inSyncBytes, globalBytes, state } = summary;
                    let completion = globalBytes ? (Math.round(((inSyncBytes * 10000) / globalBytes)) / 100) : 0;
                    if (completion > 100)
                        completion = 100;
                    const insync = globalBytes ? (globalBytes === inSyncBytes) : false;
                    app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, `Cloud folder "${folder}" in sync? ${insync}\t${completion}% state "${state}"`); // - total=${globalBytes} Bytes - inSync=${inSyncBytes} Bytes`);
                    return {
                        folder,
                        stat: {
                            state,
                            completion,
                            globalBytes,
                            needBytes: globalBytes - inSyncBytes,
                            doneBytes: inSyncBytes
                        }
                    };
                });
                callback(null, summaries);
            }
            else {
                callback(null, results);
            }
        });
        /**
         * ACTION_SYNCTHING_CLOUD_CONTENTS_SET
         */
        this.genericEventActionSyncthingCloudContentsSet = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            const stContents = payload.body || null;
            if (!stContents) {
                app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, '{Cloud_Action} SetCloudContents - contents=null - do nothing');
                return callback(socket_generic_actions_1.MISSING_BODY, null);
            }
            const contents = stContents.filter(c => !c.isC3App);
            const apps = stContents.filter(c => c.isC3App);
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, `{Cloud_Action} SetCloudContents - C3 should have ${stContents.length} contents/apps`);
            app_1.App.log(typescript_simple_logger_1.LogLevel.DEBUG, `CONTENTS ${JSON.stringify(contents)}`);
            app_1.App.log(typescript_simple_logger_1.LogLevel.DEBUG, `APPS ${JSON.stringify(apps)}`);
            // add/remove syncthing folder
            yield this.syncthingClient.setContentsOrApplications(stContents, 'contents');
            // update Contents on mongoDB
            yield util_1.backendRequest('PUT', '/cloudcontrol/contents', { contents, apps })
                .catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.ERROR, `PUT contents - backend - ${JSON.stringify(err)}`));
            return callback(null, { status: 'ok' });
        });
        /**
         * ACTION_SYNCTHING_CLOUD_APPLICATION_UPDATE
         */
        this.genericEventActionSyncthingCloudApplicationUpdate = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, '{Cloud_Action} Application metadata update');
            const application = payload.body || null;
            if (!application || !application.name || !application.folderId) {
                return callback(socket_generic_actions_1.MISSING_BODY, null);
            }
            const result = yield util_1.backendRequest('PUT', `/cloudcontrol/applications/${application.folderId}`, { application })
                .catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.ERROR, `PUT application - backend - ${JSON.stringify(err)}`));
            console.log('update one application result', result);
            return callback(null, result);
        });
        this.initGenericEvenActionMap();
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEvenActionMap() {
        this.genericEventActionMap = new Map([
            [types_1.GenericEventAction.ACTION_SYNCTHING_RESTART_SERVICE, {
                    func: this.genericEventActionSyncthingRestartService,
                }],
            [types_1.GenericEventAction.ACTION_C3_CLOUD_CLIENT_RESTART_SERVICE, {
                    func: this.genericEventActionC3CloudClientRestartService,
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_CLOUD_SETTINGS_SET, {
                    func: this.genericEventActionSyncthingCloudSettingsSet,
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_CLOUD_UPDATED_CONTENTS, {
                    func: this.genericEventActionSyncthingCloudUpdatedContents,
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_CLOUD_CONTENT_UPDATE, {
                    func: this.genericEventActionSyncthingCloudContentUpdate,
                    description: `Update one content on mongodb`,
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_CLOUD_CONTENTS_SET, {
                    func: this.genericEventActionSyncthingCloudContentsSet,
                    description: `Add content on mongodb and syncthing config`,
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_CLOUD_CONTENT_SUMMARIES, {
                    func: this.genericEventActionSyncthingCloudContentSummaries,
                    description: `Get content summaries`,
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_SUMMARIES, {
                    func: this.genericEventActionSyncthingSummaries,
                    description: `Get content summaries`,
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_CLOUD_APPLICATION_UPDATE, {
                    func: this.genericEventActionSyncthingCloudApplicationUpdate,
                    description: `Get application summaries`,
                }],
        ]);
    }
    // init local module actions into final module genericEventActionMapAll
    initGenericEventActionMapAll() {
        // combine all local module actions
        this.combineActions();
    }
}
exports.SocketGenericActionsSyncthingCloudService = SocketGenericActionsSyncthingCloudService;
//# sourceMappingURL=syncthing-cloud.js.map