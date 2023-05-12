export default function runAfter(time = 1000) {
  return function closureFn(
    target: any,
    property: string,
    descriptor: PropertyDescriptor,
  ) {
    const fn = descriptor.value;

    descriptor.value = function newFn(...opts: any[]) {
      try {
        return new Promise((resolve) => {
          setTimeout(async () => {
            const result = fn.apply(this, opts);
            if (
              typeof result === "object" &&
              typeof result?.then === "function"
            ) {
              const data = await result;
              resolve(data);
              return;
            }

            return resolve(result);
          }, time);
        });
      } catch (e) {
        throw e;
      }
    };
  };
}
