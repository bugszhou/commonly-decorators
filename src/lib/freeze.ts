import freezeClick from "freeze-click";

export default function freeze(maxTimeout = 10000) {
  return function closureFn(
    target: any,
    property: string,
    descriptor: PropertyDescriptor,
  ) {
    const fn = descriptor.value;

    descriptor.value = freezeClick(async function newFn(
      this: any,
      fc,
      ...opts
    ) {
      try {
        const result = await fn.apply(this, opts);
        return result;
      } catch (e) {
        throw e;
      } finally {
        fc.cancel();
      }
    }, maxTimeout);
  };
}
