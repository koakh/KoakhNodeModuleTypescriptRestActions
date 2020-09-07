/**
 * GenericEventAction enums
 */
export enum GenericEventAction {
  // core actions
  ACTION_NOT_IMPLEMENTED = 'ACTION_NOT_IMPLEMENTED',
  ACTION_CLIENT_STATUS = 'ACTION_CLIENT_STATUS',
  ACTION_ACTION_LIST = 'ACTION_ACTION_LIST',
  ACTION_CONSOLE_LOG = 'ACTION_CONSOLE_LOG',
  ACTION_ACK_OK = 'ACTION_ACK_OK',
  ACTION_ACK_KO = 'ACTION_ACK_KO',
  // service actions: shell
  ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC = 'ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC',
  // disabled actions
  ACTION_SHELL_SERVICE_ENABLE_TUNNELS = 'ACTION_SHELL_SERVICE_ENABLE_TUNNELS',
  ACTION_SHELL_SERVICE_DISABLE_TUNNELS = 'ACTION_SHELL_SERVICE_DISABLE_TUNNELS',
  ACTION_SHELL_SERVICE_TUNNELS_STATUS = 'ACTION_SHELL_SERVICE_TUNNELS_STATUS',
}

export enum GenericEventActionParameterType {
  STRING = 'string',
  NUMBER = 'number',
  ARRAY = 'array',
  OBJECT = 'object',
  ACTION = 'action',
}

// define function type
export type GenericEventActionFunction = (payload: any) => Promise<any>;

export interface GenericEventActionPayload {
  query?: { [key: string]: string };
  body?: any;
}

export interface GenericShellExecCommandPayload {
  body: {
    cmd: string,
    args: string[],
    cwd?: string,
    showLog?: boolean,
  }
}

// TODO implement multiple commands
// export interface GenericEventGenericShellExecPayload {
//   body?: GenericShellExecCommand[],
// }

// query parameters
export interface GenericEventActionParameter {
  description?: string;
  type?: GenericEventActionParameterType;
  required?: boolean;
}

export interface GenericEventActionBody {
  description?: string;
  example?: any;
  required?: boolean;
}

// used in Map
export interface GenericEventActionMapObject {
  func: GenericEventActionFunction;
  description?: string;
  link?: string;
  parameters?: Map<string, GenericEventActionParameter>;
  body?: GenericEventActionBody;
  disabled?: boolean;
}

// used in actionList response payload
export interface GenericEventActionListResponse {
  action: GenericEventAction;
  description?: string;
  link?: string;
  parameters?: GenericEventActionParameter[];
  body?: GenericEventActionBody;
}
