import { GenericEventAction, GenericEventActionMapObject, GenericEventActionPayload } from '../../types';
import { execScript, ExecScriptResponse } from '../../util';
import { ActionBaseClass } from '../base/action-base-class';

export class ShellActionService extends ActionBaseClass {
  constructor() {
    super();
    this.initGenericEvenActionMap();
    this.initGenericEventActionMapAll();
  }

  // init local module actions
  public initGenericEvenActionMap() {
    this.genericEventActionMap = new Map<GenericEventAction, GenericEventActionMapObject>([
      [GenericEventAction.ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC, {
        func: this.genericEventActionShellGenericShellExec,
        description: 'Execute shell command(s) forwarding all stdio.',
        link: 'https://www.npmjs.com/package/exec-sh#public-api',
        body: {
          required: true,
          description: 'body can be a command or an array of commands',
          // TODO change example
          example: {
            singleCommand: {
              body: 'sudo service backend status'
            },
            // TODO multiple commands work?
            multipleCommands: {
              body: [
                'service openvpn status',
                'service sshd status'
              ]
            }
          },
        }
      }],
    ]);
  }

  // init local module actions into final enable module genericEventActionMapAll
  public initGenericEventActionMapAll() {
    // combine all local module actions
    this.combineActions();
  }

  private execShell = (cmd: string, args: string[] = [], cwd: string = null, showLog: boolean = false): Promise<ExecScriptResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res: ExecScriptResponse = await execScript(cmd, args, cwd, showLog);
        // resolve promise
        resolve(res);
      } catch (error) {
        // reject promise
        reject(error);
      }
    })
  };

  /**
   * helper to get error message from execShPromise
   */
  // TODO is used?
  private getExecShErrorMessage(error) {
    // send error callback
    if (error.stderr) {
      return error.stderr;
    } else if (error.message) {
      return error.message;
    } else {
      return error;
    }
  }

  /**
   * ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC
   */
  private genericEventActionShellGenericShellExec = (payload: GenericEventActionPayload): Promise<ExecScriptResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const {cmd, args, cwd, showLog} = payload.body;
        const res: ExecScriptResponse = await execScript(cmd, args, cwd, showLog);
        // resolve promise
        resolve(res);
      } catch (error) {
        // reject promise
        reject(error);
      }
    })
  };

}
