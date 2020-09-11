import { GenericEventAction, GenericEventActionMapObject, GenericEventActionPayload } from '../../types';
import { execShellCommand, ExecShellCommandResponse } from '../../util';
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
        description: 'Execute shell command(s) forwarding all stdio, stderr',
        body: {
          required: true,
          description: 'require a body with command payload',
          example: {
            payload: {
              body: {
                cmd: 'service',
                args: ['sshd', 'status'],
                cwd: null,
                showLog: false
              }
            }
          },
        },
      }],
    ]);
  }

  // init local module actions into final enable module genericEventActionMapAll
  public initGenericEventActionMapAll() {
    // combine all local module actions
    this.combineActions();
  }

  /**
   * ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC
   */
  private genericEventActionShellGenericShellExec = (payload: GenericEventActionPayload): Promise<ExecShellCommandResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { cmd, args, cwd, showLog } = payload.body;
        const res: ExecShellCommandResponse = await execShellCommand(cmd, args, cwd, showLog);
        // resolve promise
        resolve(res);
      } catch (error) {
        // reject promise
        reject(error);
      }
    })
  };
}
