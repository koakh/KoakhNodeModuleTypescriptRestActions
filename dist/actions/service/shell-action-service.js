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
exports.ShellActionService = void 0;
const types_1 = require("../../types");
const util_1 = require("../../util");
const action_base_class_1 = require("../base/action-base-class");
class ShellActionService extends action_base_class_1.ActionBaseClass {
    constructor() {
        super();
        // TODO is used?
        // private execShell = (cmd: string, args: string[] = [], cwd: string = null, showLog: boolean = false): Promise<ExecShellCommandResponse> => {
        //   return new Promise(async (resolve, reject) => {
        //     try {
        //       const res: ExecShellCommandResponse = await execShellCommand(cmd, args, cwd, showLog);
        //       // resolve promise
        //       resolve(res);
        //     } catch (error) {
        //       // reject promise
        //       reject(error);
        //     }
        //   })
        // };
        // TODO is used?
        /**
         * helper to get error message from execShPromise
         */
        // private getExecShErrorMessage(error) {
        //   // send error callback
        //   if (error.stderr) {
        //     return error.stderr;
        //   } else if (error.message) {
        //     return error.message;
        //   } else {
        //     return error;
        //   }
        // }
        /**
         * ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC
         */
        this.genericEventActionShellGenericShellExec = (payload) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { cmd, args, cwd, showLog } = payload.body;
                    const res = yield util_1.execShellCommand(cmd, args, cwd, showLog);
                    // resolve promise
                    resolve(res);
                }
                catch (error) {
                    // reject promise
                    reject(error);
                }
            }));
        };
        this.initGenericEvenActionMap();
        this.initGenericEventActionMapAll();
    }
    // init local module actions
    initGenericEvenActionMap() {
        this.genericEventActionMap = new Map([
            [types_1.GenericEventAction.ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC, {
                    func: this.genericEventActionShellGenericShellExec,
                    description: 'Execute shell command(s) forwarding all stdio.',
                    link: 'https://www.npmjs.com/package/exec-sh#public-api',
                    body: {
                        required: true,
                        description: 'require a body with command payload',
                        example: {
                            // TODO implement array of multiple commands
                            singleCommand: {
                                body: {
                                    cmd: 'service',
                                    args: ['sshd', 'status'],
                                    cwd: '/tmp',
                                    showLog: false,
                                },
                            },
                        },
                    }
                }],
        ]);
    }
    // init local module actions into final enable module genericEventActionMapAll
    initGenericEventActionMapAll() {
        // combine all local module actions
        this.combineActions();
    }
}
exports.ShellActionService = ShellActionService;
//# sourceMappingURL=shell-action-service.js.map