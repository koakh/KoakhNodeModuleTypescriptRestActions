import { GenericEventAction, GenericEventActionMapObject, GenericEventActionPayload, GenericEventActionCallbackFunction } from '../../types';
import { ActionBaseClass } from '../base/action-base-class';
import { NOT_IMPLEMENTED } from '../generic-actions';

/**
 * serve has a base template for clientType actions actions/client-type/* and service actions actions/service/*
 */

export class SocketGenericActionsCcSocketClient extends ActionBaseClass {

  constructor() {
    super();
    this.initGenericEvenActionMap();
    // client type only: used this method ONLY in client types actions/client-type/*
    this.initGenericEventActionMapAll();
  }

  // init local module actions
  public initGenericEvenActionMap() {
    this.genericEventActionMap = new Map<GenericEventAction, GenericEventActionMapObject>([
      [GenericEventAction.ACTION_NOT_IMPLEMENTED, {
        func: this.genericEventActionNotImplemented,
      }],
    ]);
  }

  // init local module actions into final module genericEventActionMapAll
  public initGenericEventActionMapAll() {
    // combine all local module actions
    this.combineActions();
  }

  /**
   * ACTION_${SERVICE_NAME}_SERVICE_STUB
   */
  private genericEventActionServiceNameStub = (payload: GenericEventActionPayload, callback: GenericEventActionCallbackFunction) => {
    // always fire response back
    callback(NOT_IMPLEMENTED, null);
  };

}
