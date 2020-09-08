import { GenericEventActionMapObject, GenericEventActionPayload } from '../../types';

export interface ActionBaseInterface {
  // local class actionMap
  genericEventActionMap: Map<string, GenericEventActionMapObject>;
  // array of action map to combine into final genericEventActionMapAll
  genericEventActionMapArray: Map<string, GenericEventActionMapObject>[];
  // combined final version of local genericEventActionMap + extended service actions for current socketClientType
  genericEventActionMapAll: Map<string, GenericEventActionMapObject>;
  // functions
  getActions(): Map<string, GenericEventActionMapObject>;
  // combine all actions into final genericEventActionMapAll
  combineActions();
  // test action stub
  genericEventActionNotImplemented(payload: GenericEventActionPayload);
}
