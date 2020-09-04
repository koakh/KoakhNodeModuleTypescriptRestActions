import { GenericEventAction, GenericEventActionMapObject, GenericEventActionPayload } from '../../types';

export interface ActionBaseInterface {
  // local class actionMap
  genericEventActionMap: Map<GenericEventAction, GenericEventActionMapObject>;
  // array of action map to combine into final genericEventActionMapAll
  genericEventActionMapArray: Map<GenericEventAction, GenericEventActionMapObject>[];
  // combined final version of local genericEventActionMap + extended service actions for current socketClientType
  genericEventActionMapAll: Map<GenericEventAction, GenericEventActionMapObject>;
  // functions
  getActions(): Map<GenericEventAction, GenericEventActionMapObject>;
  // combine all actions into final genericEventActionMapAll
  combineActions();
  // test action stub
  genericEventActionNotImplemented(payload: GenericEventActionPayload);
}
