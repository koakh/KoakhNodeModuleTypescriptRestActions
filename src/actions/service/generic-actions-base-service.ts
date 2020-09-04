/**
 * base actions for all clients
 */

import { GenericEventAction, GenericEventActionCallbackFunction, GenericEventActionMapObject, GenericEventActionPayload } from '../../types';
import { ActionBaseClass } from '../base/action-base-class';
import { NOT_IMPLEMENTED } from '../generic-actions';

export class GenericActionsBaseService extends ActionBaseClass {

  constructor(
    private getGenericEventActionKey
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
          example: `body: {'pwd'} | body: {['pwd', 'ls -la']}`
        }
      }],
      [GenericEventAction.ACTION_ACK_OK, {
        func: this.genericEventActionAckOk
      }],
      [GenericEventAction.ACTION_ACK_KO, {
        func: this.genericEventActionAckKo
      }],
    ]);
  }

  // init local module actions into final module genericEventActionMapAll
  public initGenericEventActionMapAll() {
    // combine all local module actions
    this.combineActions();
  }

  /**
   * ACTION_CONSOLE_LOG
   */
  private genericEventActionConsoleLog = (payload: GenericEventActionPayload, callback: GenericEventActionCallbackFunction) => {
    const { body: { message } }: { body?: { [key: string]: string } } = payload;
    try {
      let result: string;
      // execute action if message is defined, this way works with required and optional parameters
      if (message) {
        result = 'message sent';
        console.log(message);
      } else {
        result = 'message received, but not logged to console because miss optional parameter \'message\'';
      }
      // response to server
      if (callback) { callback(null, { message: result }); }
    } catch (error) {
      if (callback) { callback(error, null); }
    }
  }

  /**
   * ACTION_ACK_OK
   */
  private genericEventActionAckOk = (payload: GenericEventActionPayload, callback: GenericEventActionCallbackFunction) => {
    try {
      // simulate some work...
      setTimeout(() => {
        callback(null, { message: 'OK' });
      }, 1000);
    } catch (error) {
      callback(error, null);
    }
  }

  /**
   * ACTION_ACK_KO
   */
  private genericEventActionAckKo = (payload: GenericEventActionPayload, callback: GenericEventActionCallbackFunction) => {
    // simulate some work...
    setTimeout(() => {
      callback(NOT_IMPLEMENTED, null);
    }, 2500);
  }
}
