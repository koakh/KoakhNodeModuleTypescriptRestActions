# README

- [based on repo](https://github.com/koakh/KoakhNodeModuleTypescriptStarter)
- [github](https://github.com/koakh/KoakhNodeModuleTypescriptRestActions.git)
- [npm](https://www.npmjs.com/package/@koakh/typescript-rest-actions-api)

## Sample App Project

- [KoakhNodeModuleTypescriptRestActionsSampleApp](https://github.com/koakh/-KoakhNodeModuleTypescriptRestActionsSampleApp)

## Description

a simple rest endpoint implementing koakh ACTION's pattern, useful to have only a http endpoint with unlimited self documented ACTION's

## Checkout sample project

```shell
$ npm i
```

## Create a simple node Express Application

1. add dependency with `npm i @koakh/typescript-rest-actions-api`
2. bootStrap `actions`/`genericActionsService`  in `app.ts`

```typescript
import { ActionBaseInterface, GenericActions as GenericActionService, GenericEventAction, GenericShellExecCommandPayload } from '@koakh/typescript-rest-actions-api';

export class App {
  ...
  private genericActionsService: GenericActionService;
  ...
  constructor() {
    // init express server
    this.expressApp = express();
    ...
    // init genericActions
    this.initGenericActions();
    // setup main http server
    this.mainServer = new MainServer(this.expressApp);
    // services
    this.mainService = new MainService(this.db, this.mainServer);
    this.actionService = new ActionService(this.db, this.mainServer, this.genericActionsService, this.mainService);
    // controllers
    this.mainController = new MainController(this.mainService);
    this.actionController = new ActionController(this.actionService);
    // routes
    this.mainRoute = new MainRoute(this.expressApp, this.mainController, this.actionController, this.multerMiddleware);
  }  

  ...

  private async initGenericActions() {
    // prepare local consumer actions service to pass to GenericActionService constructor
    const systemDActionService: SystemActionService = new SystemActionService();
    const actionsServices: ActionBaseInterface[] = [systemDActionService];
    // select module actions and combine it with local consumer actions
    const combinedGenericEventActions = [
      GenericEventAction.ACTION_ACTION_LIST,
      ...Object.keys(GenericEventActionLocal),
    ];
    // construct GenericActionService with local action services
    this.genericActionsService = new GenericActionService(actionsServices, combinedGenericEventActions, false);
  }
  ...
```
