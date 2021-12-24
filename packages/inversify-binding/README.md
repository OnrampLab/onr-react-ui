# `inversify-binding`

> inversify di library easy use

> no need to reimport `reflect-metadata`

## Usage

please check [inversify](https://github.com/inversify/InversifyJS) see how to create module

```ts
import { inject, injectable } from 'inversify';
import { createContainerModule, createCoreContainer } from '../src/index';

const keyA = 'serviceA';
const keyB = 'serviceB';
interface IServiceA {
  getString(): string;
}

interface IServiceB {
  getString(): string;
  getStringFromA(): string;
}

@injectable()
class serviceA implements IServiceA {
  getString() {
    return 'serviceA';
  }
}

@injectable()
class serviceB implements IServiceB {
  @inject(keyA)
  private _serviceA!: serviceA;
  getString() {
    return 'serviceB';
  }
  getStringFromA() {
    return this._serviceA.getString();
  }
}

const coreContainer = createCoreContainer()
// nextjs page a using this
const serviceAModule = createContainerModule([keyA, serviceA])
// nextjs page b using this
const serviceBModule = createContainerModule([keyA, serviceA], [keyB, serviceB])
```

- Why splitting `serviceAModule` and `serviceBModule` but both of them import `serviceA`?

make this can be easily code splitting in nextjs, then each page can inject the service module and avoid the repeated import.

> load module

```ts
coreContainer.load(serviceAModule);
coreContainer.load(serviceBModule);
```

## How to use in react component?

please check [inversify-react](https://github.com/Kukkimonsuta/inversify-react)

