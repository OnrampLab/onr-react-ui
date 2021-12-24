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

describe('inversify-binding', () => {
  it('import module repeated', () => {
    const coreContainer = createCoreContainer();
    const module = createContainerModule([keyA, serviceA]);
    coreContainer.load(module);
    coreContainer.load(module);
  });

  it('service work well', () => {
    const coreContainer = createCoreContainer([keyA, serviceA], [keyB, serviceB]);
    const _serviceA = coreContainer.container.get<serviceA>(keyA);
    const _serviceB = coreContainer.container.get<serviceB>(keyB);

    expect(_serviceA.getString()).toBe('serviceA');
    expect(_serviceB.getString()).toBe('serviceB');
    expect(_serviceB.getStringFromA()).toBe('serviceA');
  });
});
