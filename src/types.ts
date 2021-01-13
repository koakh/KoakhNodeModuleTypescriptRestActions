/**
 * GenericEventAction map (a map of enums)
 * always use convention ACTION_${CATEGORY/SERVICE_NAME}_${ACTION_NAME}
 */
export interface GenericEventActionMap {
  key: string;
}

/**
 * GenericEventAction enums
 */
export enum GenericEventAction {
  // core actions
  ACTION_ACTION_LIST = 'ACTION_ACTION_LIST',
  ACTION_NOT_IMPLEMENTED = 'ACTION_NOT_IMPLEMENTED',
  ACTION_CONSOLE_LOG = 'ACTION_CONSOLE_LOG',
  ACTION_ACK_OK = 'ACTION_ACK_OK',
  ACTION_ACK_KO = 'ACTION_ACK_KO',
  // service actions: shell
  ACTION_SYSTEM_SHELL_GENERIC_EXEC = 'ACTION_SYSTEM_SHELL_GENERIC_EXEC',
  // disabled actions
  ACTION_SYSTEM_SERVICE_TUNNEL_ENABLE = 'ACTION_SYSTEM_SERVICE_TUNNEL_ENABLE',
  ACTION_SYSTEM_SERVICE_TUNNEL_DISABLE = 'ACTION_SYSTEM_SERVICE_TUNNEL_DISABLE',
  ACTION_SYSTEM_SERVICE_TUNNEL_STATUS = 'ACTION_SYSTEM_SERVICE_TUNNEL_STATUS',
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
  disabled?: boolean;
  // when enable it fire the event, use use that event for ex for audit
  fireEvent?: boolean;
  parameters?: Map<string, GenericEventActionParameter>;
  body?: GenericEventActionBody;
}

// used in actionList response payload
export interface GenericEventActionListResponse {
  action: string;
  description?: string;
  link?: string;
  disabled?: boolean;
  fireEvent?: boolean;
  parameters?: GenericEventActionParameter[];
  body?: GenericEventActionBody;
}
