# README

- [based on repo](https://github.com/koakh/KoakhNodeModuleTypescriptStarter)

## Use APi

bellow example use default `ACTION_ACTION_LIST` and `ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC` module actions

```typescript
const resActionList: any = await this.actionsService.processAction(GenericEventAction.ACTION_ACTION_LIST)
  .catch((error) => App.log(LogLevel.ERROR, error));
```

```json
[
  {
    "action": "ACTION_ACTION_LIST",
    "parameters": [
      {
        "required": false,
        "type": "action",
        "description": "action ex.: ACTION_CLIENT_STATUS",
        "name": "action"
      }
    ]
  },
  {
    "action": "ACTION_CONSOLE_LOG",
    "body": {
      "required": true,
      "description": "just a test console log action",
      "example": "body: {'pwd'} | body: {['pwd', 'ls -la']}"
    }
  },
  {
    "action": "ACTION_ACK_OK"
  },
  {
    "action": "ACTION_ACK_KO"
  },
  {
    "action": "ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC",
    "description": "Execute shell command(s) forwarding all stdio.",
    "link": "https://www.npmjs.com/package/exec-sh#public-api",
    "body": {
      "required": true,
      "description": "body can be a command or an array of commands",
      "example": {
        "singleCommand": {
          "body": "sudo service backend status"
        },
        "multipleCommands": {
          "body": [
            "sudo service openvpn status",
            "sudo service sshd status"
          ]
        }
      }
    }
  }
]
```

const resShellExec: any = await this.actionsService.processAction(GenericEventAction.ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC, payload)
  .catch((error) => App.log(LogLevel.ERROR, error));
```

```typescript
import { GenericActions, GenericEventAction, GenericEventActionPayload } from '@koakh/typescript-rest-actions-api';

export class MainServer {
  private httpServer: http.Server;
  private httpsServer: https.Server;
  private actionsService: GenericActions;

  constructor(private expressApp: Application) {
    this.initGenericActions();
  }

  private async initGenericActions() {
    // init service
    this.actionsService = new GenericActions();

    // test actionList
    const resActionList: any = await this.actionsService.processAction(GenericEventAction.ACTION_ACTION_LIST)
      .catch((error) => App.log(LogLevel.ERROR, error));
    App.log(LogLevel.DEBUG, resActionList);

    // test shellExec
    const payload: GenericEventActionPayload = {
      body: {
        cmd: 'service',
        args: ['sshd', 'status'],
        cwd: null,
        showLog: true,
      },
    };
    const resShellExec: any = await this.actionsService.processAction(GenericEventAction.ACTION_SHELL_SERVICE_GENERIC_SHELL_EXEC, payload)
      .catch((error) => App.log(LogLevel.ERROR, error));
    App.log(LogLevel.DEBUG, resShellExec);
  }
}
```
