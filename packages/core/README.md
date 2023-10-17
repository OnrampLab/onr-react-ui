# `onr-core`

> TODO: description

## Usage

### How to create a plugin

```typescript
import { App, Plugin } from '@onr/core';
import { UserService } from './services';

export class UserPlugin implements Plugin {
  public name = 'UserPlugin';

  async bootstrap(app: App): Promise<void> {
    this.registerServices(app);
  }

  private registerServices(app: App) {
    const adminAxiosInstance = app.apis.adminAxiosInstance;

    const userService = UserService.fromAxiosInstanceAndName(adminAxiosInstance, 'users');

    app.addService('userService', userService);
  }
}
```
