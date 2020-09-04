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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGenericActionsSystemService = void 0;
const typescript_simple_logger_1 = require("@koakh/typescript-simple-logger");
const systeminformation_1 = __importDefault(require("systeminformation"));
const app_1 = require("../../../app");
const util_1 = require("../../../util");
const types_1 = require("../../types");
const action_base_class_1 = require("../base/action-base-class");
class SocketGenericActionsSystemService extends action_base_class_1.ActionBaseClass {
    constructor() {
        super();
        /**
         * ACTION_C3_INFO
         */
        this.c3Info = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            const info = yield util_1.getC3Info();
            callback(null, info);
        });
        /**
         * ACTION_SYSTEM_INFO_DISK
         */
        this.systemInfoDisk = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            systeminformation_1.default.fsSize()
                .then(disk => {
                callback(null, { systemInfo: { disk } });
            })
                .catch(err => {
                app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err));
                callback(err, null);
            });
        });
        /**
         * ACTION_SYSTEM_SERVICE_INFO
         */
        this.systemInfo = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            const systemInfo = {};
            systemInfo.cpu = yield systeminformation_1.default.cpu().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            systemInfo.mem = yield systeminformation_1.default.mem().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            systemInfo.disk = yield systeminformation_1.default.fsSize().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            systemInfo.bios = yield systeminformation_1.default.bios().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            systemInfo.battery = yield systeminformation_1.default.battery().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            systemInfo.osInfo = yield systeminformation_1.default.osInfo().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            systemInfo.wifiNetworks = yield systeminformation_1.default.wifiNetworks().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            systemInfo.networkInterfaces = yield systeminformation_1.default.networkInterfaces().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            systemInfo.networkStats = yield systeminformation_1.default.networkStats().catch(err => app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err)));
            // if any null value... delete it
            Object.keys(systemInfo).forEach(key => {
                if (!systemInfo[key])
                    delete systemInfo[key];
            });
            callback(null, { systemInfo });
        });
        /**
         * ACTION_SYSTEM_INFO_DYNAMIC
         */
        this.systemInfoDynamic = (payload, callback) => __awaiter(this, void 0, void 0, function* () {
            systeminformation_1.default.getDynamicData()
                .then(dynamic => {
                callback(null, { systemInfo: { dynamic } });
            })
                .catch(err => {
                app_1.App.log(typescript_simple_logger_1.LogLevel.WARN, JSON.stringify(err));
                callback(err, null);
            });
        });
        this.initGenericEventActionMap();
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEventActionMap() {
        this.genericEventActionMap = new Map([
            [types_1.GenericEventAction.ACTION_NOT_IMPLEMENTED, {
                    func: this.genericEventActionNotImplemented,
                }],
            [types_1.GenericEventAction.ACTION_SYSTEM_INFO_DISK, {
                    func: this.systemInfoDisk,
                    description: `Get System Info`,
                }],
            [types_1.GenericEventAction.ACTION_SYSTEM_INFO, {
                    func: this.systemInfo,
                    description: `Get System Info`,
                }],
            [types_1.GenericEventAction.ACTION_SYSTEM_INFO_DYNAMIC, {
                    func: this.systemInfoDynamic,
                    description: `Get System Info`,
                }],
            [types_1.GenericEventAction.ACTION_C3_INFO, {
                    func: this.c3Info,
                    description: `Get C3 Info`,
                }],
        ]);
    }
    initGenericEventActionMapAll() {
        this.combineActions();
    }
}
exports.SocketGenericActionsSystemService = SocketGenericActionsSystemService;
//# sourceMappingURL=system.js.map