import { Container, ContainerModule } from 'inversify';
import 'reflect-metadata';
export function createContainerModule(...services: [string, new (arg: any) => void][]) {
  return new ContainerModule((bind, _, isBound) => {
    services.forEach(([key, service]) => {
      !isBound(key) && bind(key).to(service);
    });
  });
}
export function createCoreContainer<key extends string>(
  ...prebindModules: [key, new (arg: any) => void][]
) {
  return new (class CoreContainer {
    public container = new Container();
    public cacheKeys = new Set<ContainerModule>();
    constructor() {
      prebindModules.forEach(([key, service]) => {
        this.container.bind(key).to(service);
      });
    }

    public load(...modules: ContainerModule[]) {
      modules.forEach(module => {
        if (this.cacheKeys.has(module)) return;
        this.cacheKeys.add(module);
        this.container.load(module);
      });
    }
  })();
}
