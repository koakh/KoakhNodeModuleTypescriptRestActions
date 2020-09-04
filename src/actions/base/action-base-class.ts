// tslint:disable: no-empty
import { ActionBaseInterface } from './action-base-interface';
import { GenericEventAction, GenericEventActionMapObject, GenericEventActionPayload } from '../../types';
import { NOT_IMPLEMENTED } from '../generic-actions';

export class ActionBaseClass implements ActionBaseInterface {
  public genericEventActionMap = new Map<GenericEventAction, GenericEventActionMapObject>();
  public genericEventActionMapArray: Map<GenericEventAction, GenericEventActionMapObject>[] = [];
  public genericEventActionMapAll = new Map<GenericEventAction, GenericEventActionMapObject>();

  public getActions(): Map<GenericEventAction, GenericEventActionMapObject> {
    // return combined all
    return this.genericEventActionMapAll;
  }

  public combineActions() {
    // unshift local genericEventActionMap into first position
    this.genericEventActionMapArray.unshift(this.genericEventActionMap);

    // now combine all actions into final genericEventActionMapAll
    this.genericEventActionMapArray.forEach((e: Map<GenericEventAction, GenericEventActionMapObject>) => {
      this.genericEventActionMapAll = new Map<GenericEventAction, GenericEventActionMapObject>([
        // local map
        ...Array.from(this.genericEventActionMapAll.entries()),
        // iterate map
        ...Array.from(e)
      ]);
    });
  }

  // common function to test actions
  public genericEventActionNotImplemented = (payload: GenericEventActionPayload) => {
    return new Promise((reject) => {
      reject(new Error(NOT_IMPLEMENTED));
    })
  };
}
