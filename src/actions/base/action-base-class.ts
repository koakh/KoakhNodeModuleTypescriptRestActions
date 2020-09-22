// tslint:disable: no-empty
import { GenericEventActionMapObject, GenericEventActionPayload } from '../../types';
import { NOT_IMPLEMENTED } from '../generic-actions';
import { ActionBaseInterface } from './action-base-interface';

export class ActionBaseClass implements ActionBaseInterface {
  public genericEventActionMap = new Map<string, GenericEventActionMapObject>();
  public genericEventActionMapArray: Map<string, GenericEventActionMapObject>[] = [];
  public genericEventActionMapAll = new Map<string, GenericEventActionMapObject>();

  public getActions(): Map<string, GenericEventActionMapObject> {
    // return combined all
    return this.genericEventActionMapAll;
  }

  /**
   * called from ActionBaseClass subclasses
   */
  public combineActions() {
    // unshift local genericEventActionMap into first position
    this.genericEventActionMapArray.unshift(this.genericEventActionMap);

    // now combine all actions into final genericEventActionMapAll
    this.genericEventActionMapArray.forEach((e: Map<string, GenericEventActionMapObject>) => {
      this.genericEventActionMapAll = new Map<string, GenericEventActionMapObject>([
        // local map
        ...Array.from(this.genericEventActionMapAll.entries()),
        // iterate map
        ...Array.from(e)
      ]);
    });
  }

  // common function to test actions
  public genericEventActionNotImplemented = (payload: GenericEventActionPayload) => {
    return new Promise((_, reject) => {
      reject(new Error(NOT_IMPLEMENTED));
    })
  };
}
