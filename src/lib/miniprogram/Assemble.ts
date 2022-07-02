interface IInject {
  new (...opts: any[]): any;
}

export function Assemble(
  key: string,
  constructor: IInject,
  constructorArgs?: string[],
) {
  return function closureFn(target: any, property: string) {
    const fn = target[key];

    if (typeof fn !== "function" && typeof fn?.then !== "function") {
      target[key] = async function newFn(...opts: any[]) {
        try {
          const args =
            (opts[0] ? constructorArgs?.map((item) => opts[0][item]) : []) ||
            [];
          this[property] = new constructor(...args);
        } catch (e) {
          console.error(e);
        }
      };
      return;
    }

    target[key] = async function newFn(...opts: any[]) {
      try {
        const args =
          (opts[0] ? constructorArgs?.map((item) => opts[0][item]) : []) || [];
        this[property] = new constructor(...args);
        const result = await fn.apply(this, opts);
        return result;
      } catch (e) {
        throw e;
      }
    };
  };
}

export function AssembleValue<IValue = unknown>(key: string, value: IValue) {
  return function closureFn(target: any, property: string) {
    const fn = target[key];

    if (typeof fn !== "function" && typeof fn?.then !== "function") {
      target[key] = async function newFn() {
        try {
          this[property] = value;
        } catch (e) {
          console.error(e);
        }
      };
      return;
    }

    target[key] = async function newFn(...opts: any[]) {
      try {
        this[property] = value;
        const result = await fn.apply(this, opts);
        return result;
      } catch (e) {
        throw e;
      }
    };
  };
}
