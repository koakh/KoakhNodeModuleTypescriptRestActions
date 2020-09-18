import { GenericEventAction, GenericEventActionMapObject, GenericEventActionPayload } from '../../types';
import { ActionBaseClass } from '../base/action-base-class';
import { ShellActionService } from './shell-action-service';

/**
 * base actions for all clients
 */
export class BaseActionService extends ActionBaseClass {

  constructor(
    private getGenericEventActionKey: (action: string) => string
  ) {
    super();
    this.initGenericEvenActionMap();
    this.initGenericEventActionMapAll();
  }

  // init local module actions
  public initGenericEvenActionMap() {
    this.genericEventActionMap = new Map<GenericEventAction, GenericEventActionMapObject>([
      // test client events
      [GenericEventAction.ACTION_CONSOLE_LOG, {
        func: this.genericEventActionConsoleLog,
        body: {
          required: true,
          description: 'just a test console log action',
          example: {
            payload: {
              body: {
                message: 'hello, check the console'
              }
            }
          }
        }
      }],
      [GenericEventAction.ACTION_ACK_OK, {
        func: this.genericEventActionAckOk,
        description: 'no description',
      }],
      [GenericEventAction.ACTION_ACK_KO, {
        func: this.genericEventActionAckKo,
        description: 'no description',
      }],
    ]);
  }

  // init local module actions into final module genericEventActionMapAll
  public initGenericEventActionMapAll() {
    // ShellService: service component actions: push SocketGenericActionsShellService service component
    const actionsShell: ShellActionService = new ShellActionService();
    this.genericEventActionMapArray.push(actionsShell.getActions());
    // combine all local module actions
    this.combineActions();
  }

  /**
   * ACTION_CONSOLE_LOG
   */
  private genericEventActionConsoleLog = (payload: GenericEventActionPayload) => {
    return new Promise((resolve, reject) => {
      try {
        const { body: { message } }: { body?: { [key: string]: string } } = payload;
        let result: string;
        // execute action if message is defined, this way works with required and optional parameters
        if (message) {
          result = 'message received, check console output';
          console.log(message);
        } else {
          result = 'message received, but not logged to console because miss optional parameter \'message\'';
        }
        resolve({ message: result });
      } catch (error) {
        reject(error);
      }
    })
  };

  /**
   * ACTION_ACK_OK
   */
  private genericEventActionAckOk = (payload: GenericEventActionPayload) => {
    return new Promise((resolve, reject) => {
      try {
        resolve({ message: 'OK' });
      } catch (error) {
        reject(error);
      }
    })
  };

  /**
   * ACTION_ACK_KO
   */
  private genericEventActionAckKo = (payload: GenericEventActionPayload) => {
    return new Promise((_, reject) => {
      // simulate some work...
      setTimeout(() => {
        reject(new Error('something wrong happens!'));
      }, 2500);
    })
  };
}
