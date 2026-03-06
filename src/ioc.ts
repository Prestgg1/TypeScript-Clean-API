import "reflect-metadata";
import { container } from "tsyringe";

export const iocContainer = {
  get: <T>(controller: { prototype: T }): T => {
    return container.resolve<T>(controller as never);
  },
};