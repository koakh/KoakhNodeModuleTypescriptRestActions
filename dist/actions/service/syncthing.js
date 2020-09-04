"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGenericActionsSyncthingService = void 0;
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
const app_1 = require("../../../app");
const typescript_simple_logger_1 = require("@koakh/typescript-simple-logger");
class SocketGenericActionsSyncthingService extends action_base_class_1.ActionBaseClass {
    constructor(syncthingClient) {
        super();
        this.syncthingClient = syncthingClient;
        /**
         * proxy common method to use syncthing rest endpoint, this way we keep request methods clean
         * we receive here the syncthing Promise and the socketServer callBack
         */
        this.requestSyncthing = (syncthingMethod, callback) => {
            try {
                syncthingMethod
                    .then((payloadData) => callback(null, payloadData))
                    .catch((error) => {
                    // don't throw here, ele we don't have any callback response in server, and we keep waiting forever
                    callback(error.message, null);
                });
            }
            catch (error) {
                callback(error.message, null);
            }
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_CONFIG
         */
        this.genericEventActionSyncthingGetSystemConfig = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.getConfig(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_CONFIG_INSYNC
         */
        this.genericEventActionSyncthingGetSystemConfigInsync = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.configInSync(), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_SYSTEM_CONFIG
         */
        this.genericEventActionSyncthingPostSystemConfig = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.setConfig(payload), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_CONNECTIONS
         */
        this.genericEventActionSyncthingGetSystemConnections = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.connections(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_DEBUG
         */
        this.genericEventActionSyncthingGetSystemDebug = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.debug(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_DISCOVERY
         */
        this.genericEventActionSyncthingGetSystemDiscovery = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.getDiscovery(), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_SYSTEM_DISCOVERY
         * Note : Removed in v0.12.0
         * Post with the query parameters device and addr to add entries to the discovery cache
         */
        this.genericEventActionSyncthingPostSystemDiscovery = (payload, callback) => {
            const { query: { device, addr } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().system.setDiscovery(device, addr), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_SYSTEM_ERROR_CLEAR
         */
        this.genericEventActionSyncthingPostSystemErrorClear = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.clearErrors(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_ERROR
         */
        this.genericEventActionSyncthingGetSystemError = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.errors(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_LOG
         */
        this.genericEventActionSyncthingGetSystemLog = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.logs(), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_SYSTEM_PAUSE
         * Pause the given device or all devices
         * Takes the optional parameter device (device ID). When omitted, pauses all devices.
         * Returns status 200 and no content upon success or status 500 and a plain text error on failure.
         */
        this.genericEventActionSyncthingPostSystemPause = (payload, callback) => {
            // all parameters are optional, we must first declare variables, and check empty payload.query
            let device;
            if (payload && 'query' in payload) {
                // there is no need to type destruct, we already type it in let
                ({ device } = payload.query);
            }
            this.requestSyncthing(this.syncthingClient.getInstance().system.pause(device), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_PING
         */
        this.genericEventActionSyncthingGetSystemPing = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.ping(), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_SYSTEM_RESTART
         */
        this.genericEventActionSyncthingPostSystemRestart = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.restart(), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_SYSTEM_RESUME
         * Resume the given device or all devices
         * Takes the optional parameter device (device ID). When omitted, resumes all devices. Returns status 200 and
         * no content upon success, or status 500 and a plain text error on failure.
         */
        this.genericEventActionSyncthingPostSystemResume = (payload, callback) => {
            // all parameters are optional, we must first declare variables, and check empty payload.query
            let device;
            if (payload && 'query' in payload) {
                // there is no need to type destruct, we already type it in let
                ({ device } = payload.query);
            }
            this.requestSyncthing(this.syncthingClient.getInstance().system.resume(device), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_SYSTEM_SHUTDOWN
         */
        this.genericEventActionSyncthingPostSystemShutdown = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.shutdown(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_STATUS
         */
        this.genericEventActionSyncthingGetSystemStatus = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.status(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_UPGRADE
         */
        this.genericEventActionSyncthingGetSystemUpgrade = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.getUpgrade(), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_SYSTEM_UPGRADE
         */
        this.genericEventActionSyncthingPostSystemUpgrade = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.upgrade(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SYSTEM_VERSION
         */
        this.genericEventActionSyncthingGetSystemVersion = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().system.version(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_DB_BROWSE
         * mandatory 'folder' parameter and two optional parameters.
         * NOTE: this parameters are note implemented in node-syncthing
         * Optional parameter 'levels' defines how deep within the tree we want to dwell down (0 based, defaults to unlimited depth)
         * Optional parameter 'prefix' defines a prefix within the tree where to start building the structure.
         */
        this.genericEventActionSyncthingGetDbBrowse = (payload, callback) => {
            const { query: { folder, levels, prefix } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.browse(folder, levels, prefix), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_DB_COMPLETION
         * Returns the completion percentage (0 to 100) for a given device and folder. Takes device and folder parameters.
         * ex "device": "J2WF4HR-EDSBAX7...","folder" :"iznee-lc4qj"
         */
        this.genericEventActionSyncthingGetDbCompletion = (payload, callback) => {
            const { query: { device, folder } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.completion(device, folder), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_DB_FILE
         * Returns most data available about a given file, including version and availability. Takes folder and file parameters.
         */
        this.genericEventActionSyncthingGetDbFile = (payload, callback) => {
            const { query: { folder, file } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.file(folder, file), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_DB_IGNORES
         * Takes one parameter, folder, and returns the content of the .stignore as the ignore field
         */
        this.genericEventActionSyncthingGetDbIgnores = (payload, callback) => {
            const { query: { folder } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.getIgnores(folder), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_DB_IGNORES
         * Expects a format similar to the output of GET call, but only containing the ignore field
         */
        this.genericEventActionSyncthingPostDbIgnores = (payload, callback) => {
            const { query: { folder }, body } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.setIgnores(folder, body), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_DB_NEED
         * Takes one mandatory parameter, folder, and returns lists of files which are needed by this device in order for it to become in sync.
         */
        this.genericEventActionSyncthingGetDbNeed = (payload, callback) => {
            const { query: { folder, page, perpage } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.need(folder, page, perpage), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_DB_OVERRIDE
         * Request override of a send only folder. Override means to make the local version latest, overriding changes made on other devices.
         * This API call does nothing if the folder is not a send only folder.
         */
        this.genericEventActionSyncthingPostDbOverride = (payload, callback) => {
            const { query: { folder } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.override(folder), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_DB_PRIO
         * Moves the file to the top of the download queue.
         */
        this.genericEventActionSyncthingPostDbPrio = (payload, callback) => {
            const { query: { folder, file } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.prio(folder, file), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_DB_REVERT
         * Request revert of a receive only folder. Reverting a folder means to undo all local changes.
         * This API call does nothing if the folder is not a receive only folder.
         */
        this.genericEventActionSyncthingPostDbRevert = (payload, callback) => {
            const { query: { folder } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.revert(folder), callback);
        };
        /**
         * ACTION_SYNCTHING_POST_DB_SCAN
         * Request immediate scan. Takes the optional parameters folder (folder ID), sub (path relative to the folder root) and next (time in seconds).
         * If folder is omitted or empty all folders are scanned. If sub is given, only this path (and children, in case it’s a directory) is scanned
         */
        this.genericEventActionSyncthingPostDbScan = (payload, callback) => {
            // all parameters are optional, we must first declare variables, and check empty payload.query
            let folder;
            let subdir;
            if (payload && 'query' in payload) {
                // there is no need to type destruct, we already type it in let
                ({ folder, subdir } = payload.query);
            }
            app_1.App.log(typescript_simple_logger_1.LogLevel.INFO, `Remote Trigger scan "${folder}"`);
            this.requestSyncthing(this.syncthingClient.getInstance().db.scan(folder, subdir), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_DB_STATUS
         * Returns information about the current status of a folder
         */
        this.genericEventActionSyncthingGetDbStatus = (payload, callback) => {
            const { query: { folder } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().db.status(folder), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_STATS_DEVICE
         * Returns general statistics about devices. Currently, only contains the time the device was last seen.
         */
        this.genericEventActionSyncthingGetStatsDevice = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().stats.devices(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_STATS_FOLDER
         * Returns general statistics about folders. Currently contains the last scan time and the last synced file.
         */
        this.genericEventActionSyncthingGetStatsFolder = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().stats.folders(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SVC_DEVICEID
         * Verifies and formats a device ID. Accepts all currently valid formats (52 or 56 characters with or without separators, upper or lower case, with trivial substitutions).
         * Takes one parameter, id, and returns either a valid device ID in modern format, or an error.
         */
        this.genericEventActionSyncthingGetSvcDeviceid = (payload, callback) => {
            const { query: { id } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().misc.deviceId(id), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SVC_LANG
         */
        this.genericEventActionSyncthingGetSvcLang = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().misc.lang(), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SVC_RANDOM_STRING
         */
        this.genericEventActionSyncthingGetSvcRandomString = (payload, callback) => {
            const { query: { length } } = payload;
            this.requestSyncthing(this.syncthingClient.getInstance().misc.randomString(length), callback);
        };
        /**
         * ACTION_SYNCTHING_GET_SVC_REPORT
         */
        this.genericEventActionSyncthingGetSvcReport = (payload, callback) => {
            this.requestSyncthing(this.syncthingClient.getInstance().misc.report(), callback);
        };
        this.initGenericEvenActionMap();
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEvenActionMap() {
        this.genericEventActionMap = new Map([
            // NOT implemented in node-syncthing package
            // [GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_BROWSE, this.genericEventActionSyncthingGetSystemBrowse],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_CONFIG, {
                    func: this.genericEventActionSyncthingGetSystemConfig,
                    description: `Returns the current configuration.`,
                    link: 'https://docs.syncthing.net/rest/system-config-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_CONFIG_INSYNC, {
                    func: this.genericEventActionSyncthingGetSystemConfigInsync,
                    description: `Returns whether the config is in sync, i.e. whether the running configuration is the same as that on disk.`,
                    link: 'https://docs.syncthing.net/rest/system-config-insync-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_CONFIG, {
                    func: this.genericEventActionSyncthingPostSystemConfig,
                    description: `Post the full contents of the configuration, in the same format as returned by the corresponding GET request. When posting the configuration succeeds, the posted configuration is immediately applied, except for changes that require a restart. Query GET /rest/system/config/insync to check if a restart is required.\n This endpoint is the main point to control Syncthing, even if the change only concerns a very small part of the config: The usual workflow is to get the config, modify the needed parts and post it again.`,
                    link: 'https://docs.syncthing.net/rest/system-config-post.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_CONNECTIONS, {
                    func: this.genericEventActionSyncthingGetSystemConnections,
                    description: `Returns the list of configured devices and some metadata associated with them. The list also contains the local device itself as not connected.\nThe connection types are TCP (Client), TCP (Server), Relay (Client) and Relay (Server).`,
                    link: 'https://docs.syncthing.net/rest/system-connections-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_DEBUG, {
                    func: this.genericEventActionSyncthingGetSystemDebug,
                    description: `Enables or disables debugging for specified facilities. Give one or both of 'enable' and 'disable' query parameters, with comma separated facility names. To disable debugging of the beacon and discovery packages, and enable it for config and db:`,
                    link: 'https://docs.syncthing.net/rest/system-debug-post.html',
                }],
            // NOT implemented in node-syncthing package
            // [GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_DEBUG, this.genericEventActionSyncthingPostSystemDebug],
            // Removed in v0.12.0.
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_DISCOVERY, {
                    func: this.genericEventActionSyncthingGetSystemDiscovery,
                    description: `Returns the contents of the local discovery cache.`,
                    link: 'https://docs.syncthing.net/rest/system-discovery-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_DISCOVERY, {
                    func: this.genericEventActionSyncthingPostSystemDiscovery,
                    description: `Post with the query parameters 'device' and 'addr' to add entries to the discovery cache.\nNote: Removed in v0.12.0.`,
                    link: 'https://docs.syncthing.net/rest/system-discovery-post.html',
                    parameters: new Map([
                        ['device', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'device ex.: J2WF4HR-EDSBAX7-A555CKD-3AVTLDG-KGDVGSS-3P7KOY4-UKDQG46-BGRJ4Q2' }],
                        ['addr', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'address ex.: 192.162.129.11:22000' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_ERROR_CLEAR, {
                    func: this.genericEventActionSyncthingPostSystemErrorClear,
                    description: `Post with empty to body to remove all recent errors.`,
                    link: 'https://docs.syncthing.net/rest/system-error-clear-post.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_ERROR, {
                    func: this.genericEventActionSyncthingGetSystemError,
                    description: `Returns the list of recent errors.`,
                    link: 'https://docs.syncthing.net/rest/system-error-get.html',
                }],
            // NOT implemented in node-syncthing package
            // [GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_ERROR, { func: this.genericEventActionSyncthingPostSystemError}],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_LOG, {
                    func: this.genericEventActionSyncthingGetSystemLog,
                    description: `Returns the list of recent log entries.`,
                    link: 'https://docs.syncthing.net/rest/system-log-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_PAUSE, {
                    func: this.genericEventActionSyncthingPostSystemPause,
                    // tslint:disable-next-line: max-line-length
                    description: `Pause the given device or all devices.\nTakes the optional parameter device (device ID). When omitted, pauses all devices. Returns status 200 and no content upon success, or status 500 and a plain text error on failure.`,
                    link: 'https://docs.syncthing.net/rest/system-pause-post.html',
                    parameters: new Map([
                        ['device', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'device. ex device=\'J2WF4HR-EDSBAX7-A555CKD-3AVTLDG-KGDVGSS-3P7KOY4-UKDQG46-BGRJ4Q2\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_PING, {
                    func: this.genericEventActionSyncthingGetSystemPing,
                    description: `Returns a {"ping": "pong"} object.`,
                    link: 'https://docs.syncthing.net/rest/system-ping-get.html',
                }],
            // NOT implemented in node-syncthing package
            // [GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_PING, { func: this.genericEventActionSyncthingPostSystemPing}],
            // NOT implemented in node-syncthing package
            // [GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_RESET, {func: this.genericEventActionSyncthingPostSystemReset}],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_RESTART, {
                    func: this.genericEventActionSyncthingPostSystemRestart,
                    description: `Post with empty body to immediately restart Syncthing.`,
                    link: 'https://docs.syncthing.net/rest/system-restart-post.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_RESUME, {
                    func: this.genericEventActionSyncthingPostSystemResume,
                    description: `Resume the given device or all devices.\nTakes the optional parameter 'device' (device ID). When omitted, resumes all devices. Returns status 200 and no content upon success, or status 500 and a plain text error on failure.`,
                    link: 'https://docs.syncthing.net/rest/system-resume-post.html',
                    parameters: new Map([
                        ['device', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'device. ex device=\'J2WF4HR-EDSBAX7-A555CKD-3AVTLDG-KGDVGSS-3P7KOY4-UKDQG46-BGRJ4Q2\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_SHUTDOWN, {
                    func: this.genericEventActionSyncthingPostSystemShutdown,
                    description: `Post with empty body to cause Syncthing to exit and not restart.`,
                    link: 'https://docs.syncthing.net/rest/system-shutdown-post.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_STATUS, {
                    func: this.genericEventActionSyncthingGetSystemStatus,
                    description: `Returns information about current system status and resource usage.`,
                    link: 'https://docs.syncthing.net/rest/system-status-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_UPGRADE, {
                    func: this.genericEventActionSyncthingGetSystemUpgrade,
                    description: `Checks for a possible upgrade and returns an object describing the newest version and upgrade possibility.`,
                    link: 'https://docs.syncthing.net/rest/system-upgrade-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_SYSTEM_UPGRADE, {
                    func: this.genericEventActionSyncthingPostSystemUpgrade,
                    description: `Perform an upgrade to the newest released version and restart. Does nothing if there is no newer version than currently running.`,
                    link: 'https://docs.syncthing.net/rest/system-upgrade-post.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SYSTEM_VERSION, {
                    func: this.genericEventActionSyncthingGetSystemVersion,
                    description: `Returns the current Syncthing version information.`,
                    link: 'https://docs.syncthing.net/rest/system-version-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_DB_BROWSE, {
                    func: this.genericEventActionSyncthingGetDbBrowse,
                    description: `Returns the directory tree of the global model. Directories are always JSON objects (map/dictionary), and files are always arrays of modification time and size. The first integer is the files modification time, and the second integer is the file size.\nThe call takes one mandatory 'folder' parameter and two optional parameters. Optional parameter 'levels' defines how deep within the tree we want to dwell down (0 based, defaults to unlimited depth) Optional parameter 'prefix' defines a prefix within the tree where to start building the structure.\nNote: This is an expensive call, increasing CPU and RAM usage on the device. Use sparingly.`,
                    link: 'https://docs.syncthing.net/rest/db-browse-get.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'target folder. ex.: folder=\'default\'' }],
                        ['levels', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'defines how deep within the tree we want to dwell down (0 based, defaults to unlimited depth)' }],
                        ['prefix', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'defines a prefix within the tree where to start building the structure' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_DB_COMPLETION, {
                    func: this.genericEventActionSyncthingGetDbCompletion,
                    description: `Returns the completion percentage (0 to 100) for a given device and folder. Takes 'device' and 'folder' parameters.\nNote: This is an expensive call, increasing CPU and RAM usage on the device. Use sparingly.`,
                    link: 'https://docs.syncthing.net/rest/db-completion-get.html',
                    parameters: new Map([
                        ['device', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'device id. ex device=\'J2WF4HR-EDSBAX7-A555CKD-3AVTLDG-KGDVGSS-3P7KOY4-UKDQG46-BGRJ4Q2\'' }],
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_DB_FILE, {
                    func: this.genericEventActionSyncthingGetDbFile,
                    description: `Returns most data available about a given file, including version and availability. Takes 'folder' and 'file' parameters.`,
                    link: 'https://docs.syncthing.net/rest/db-file-get.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                        ['file', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'file: ex.: file=\'src/utils.js\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_DB_IGNORES, {
                    func: this.genericEventActionSyncthingGetDbIgnores,
                    description: `Takes one parameter, 'folder', and returns the content of the .stignore as the 'ignore' field. A second field, 'expanded', provides a list of strings which represent globbing patterns described by gobwas/glob (based on standard wildcards) that match the patterns in '.stignore' and all the includes. If appropriate these globs are prepended by the following modifiers: ! to negate the glob, (?i) to do case insensitive matching and (?d) to enable removing of ignored files in an otherwise empty directory.`,
                    link: 'https://docs.syncthing.net/rest/db-ignores-post.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_DB_IGNORES, {
                    func: this.genericEventActionSyncthingPostDbIgnores,
                    description: `Expects a format similar to the output of GET call, but only containing the 'ignore' field ('expanded' field should be omitted). It takes one parameter, 'folder', and either updates the content of the '.stignore' echoing it back as a response, or returns an error.`,
                    link: 'https://docs.syncthing.net/rest/db-ignores-get.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                    ]),
                    body: {
                        required: true,
                        description: 'expects a format similar to the output of GET call',
                        example: `body: {'ignore': [ 'Dockerfile', 'package.json', 'src/event.js' ]}`,
                    },
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_DB_NEED, {
                    func: this.genericEventActionSyncthingGetDbNeed,
                    description: `Takes one mandatory parameter, 'folder', and returns lists of files which are needed by this device in order for it to become in sync.\nFurthermore takes an optional 'page' and 'perpage' arguments for pagination. Pagination happens, across the union of all needed files, that is - across all 3 sections of the response\nNote: This is an expensive call, increasing CPU and RAM usage on the device. Use sparingly.This is an expensive call, increasing CPU and RAM usage on the device. Use sparingly.`,
                    link: 'https://docs.syncthing.net/rest/db-need-get.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                        ['page', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'page id. ex page=1' }],
                        ['perpage', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'perpage id. ex perpage=10' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_DB_OVERRIDE, {
                    func: this.genericEventActionSyncthingPostDbOverride,
                    description: `Request override of a send only folder. Override means to make the local version latest, overriding changes made on other devices. This API call does nothing if the folder is not a send only folder.`,
                    link: 'https://docs.syncthing.net/rest/db-override-post.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_DB_PRIO, {
                    func: this.genericEventActionSyncthingPostDbPrio,
                    description: `Moves the file to the top of the download queue.`,
                    link: 'https://docs.syncthing.net/rest/db-prio-post.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                        ['file', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'file: ex.: file=\'src/utils.js\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_DB_REVERT, {
                    func: this.genericEventActionSyncthingPostDbRevert,
                    description: `Request revert of a receive only folder. Reverting a folder means to undo all local changes. This API call does nothing if the folder is not a receive only folder.`,
                    link: 'https://docs.syncthing.net/rest/db-revert-post.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_POST_DB_SCAN, {
                    func: this.genericEventActionSyncthingPostDbScan,
                    description: `Request immediate scan. Takes the optional parameters 'folder' (folder ID), 'sub' (path relative to the folder root) and 'next' (time in seconds). If 'folder' is omitted or empty all folders are scanned. If 'sub' is given, only this path (and children, in case it’s a directory) is scanned. The next argument delays Syncthing’s automated rescan interval for a given amount of seconds.\nRequesting scan of a path that no longer exists, but previously did, is valid and will result in Syncthing noticing the deletion of the path in question.\nReturns status 200 and no content upon success, or status 500 and a plain text error if an error occurred during scanning.`,
                    link: 'https://docs.syncthing.net/rest/db-scan-post.html',
                    parameters: new Map([
                        ['folder', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                        ['subdir', { required: false, type: types_1.GenericEventActionParameterType.STRING, description: 'subdir id. ex subdir=\'foo/bar\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_DB_STATUS, {
                    func: this.genericEventActionSyncthingGetDbStatus,
                    description: `Returns information about the current status of a folder. Note: This is an expensive call, increasing CPU and RAM usage on the device. Use sparingly.`,
                    link: 'https://docs.syncthing.net/rest/db-status-get.html',
                    parameters: new Map([
                        ['folder', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'folder id. ex folder=\'iznee-lc4qj\'' }],
                    ]),
                }],
            // NOT implemented in node-syncthing package
            // [GenericEventAction.ACTION_SYNCTHING_GET_EVENTS, { func: this.genericEventActionSyncthingGetEvents}],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_STATS_DEVICE, {
                    func: this.genericEventActionSyncthingGetStatsDevice,
                    description: `Returns general statistics about devices. Currently, only contains the time the device was last seen.`,
                    link: 'https://docs.syncthing.net/rest/stats-device-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_STATS_FOLDER, {
                    func: this.genericEventActionSyncthingGetStatsFolder,
                    description: `Returns general statistics about folders. Currently contains the last scan time and the last synced file.`,
                    link: 'https://docs.syncthing.net/rest/stats-folder-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SVC_DEVICEID, {
                    func: this.genericEventActionSyncthingGetSvcDeviceid,
                    description: `Verifies and formats a device ID. Accepts all currently valid formats (52 or 56 characters with or without separators, upper or lower case, with trivial substitutions). Takes one parameter, id, and returns either a valid device ID in modern format, or an error.`,
                    link: 'https://docs.syncthing.net/rest/svc-deviceid-get.html',
                    parameters: new Map([
                        ['id', { required: true, type: types_1.GenericEventActionParameterType.STRING, description: 'id. ex id=\'p56ioi7m--zjnu2iq-gdr-eydm-2mgtmgl3bxnpq6w5btbbz4tjxzwicq\'' }],
                    ]),
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SVC_LANG, {
                    func: this.genericEventActionSyncthingGetSvcLang,
                    description: `Returns a list of canonicalized localization codes, as picked up from the 'Accept-Language' header sent by the browser.`,
                    link: 'https://docs.syncthing.net/rest/svc-lang-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SVC_RANDOM_STRING, {
                    func: this.genericEventActionSyncthingGetSvcRandomString,
                    description: `Returns a strong random generated string (alphanumeric) of the specified length. Takes the length parameter.`,
                    link: 'https://docs.syncthing.net/rest/svc-random-string-get.html',
                }],
            [types_1.GenericEventAction.ACTION_SYNCTHING_GET_SVC_REPORT, {
                    func: this.genericEventActionSyncthingGetSvcReport,
                    description: `Returns the data sent in the anonymous usage report.`,
                    link: 'https://docs.syncthing.net/rest/svc-report-get.html',
                }],
        ]);
    }
    // init local module actions into final module genericEventActionMapAll
    initGenericEventActionMapAll() {
        // combine all local module actions
        this.combineActions();
    }
}
exports.SocketGenericActionsSyncthingService = SocketGenericActionsSyncthingService;
//# sourceMappingURL=syncthing.js.map