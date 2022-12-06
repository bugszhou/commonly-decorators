import ReturnData from "return-data";

export default function Polling(
  intervalTime = 1000,
  pollingId = "__polling__",
) {
  return function closurePolling(
    target: any,
    property: string,
    descriptor: PropertyDescriptor,
  ) {
    const originFn = descriptor.value;

    descriptor.value = function fn(this: any, ...opts: any[]) {
      if (!this[pollingId]) {
        this[pollingId] = [];
      }

      if (!Array.isArray(this[pollingId])) {
        this[pollingId] = [this[pollingId]];
      }

      return new Promise((resolve) => {
        const timer = setTimeout(async () => {
          const result = await originFn.apply(this, opts);
          if (ReturnData.isOk(result)) {
            resolve(result);
            return;
          }

          this[pollingId] = this[pollingId].filter(
            (item: ReturnType<typeof setTimeout>) => item !== timer,
          );
          clearTimeout(timer);
          fn.apply(this, opts);
        }, intervalTime);

        this[pollingId].push(timer);
      });
    };

    const originOnUnload = target.onUnload;
    target.onUnload = async function newOnUnload(...opts: any[]) {
      this[pollingId].forEach((item: ReturnType<typeof setTimeout>) => {
        clearTimeout(item);
      });
      this[pollingId] = null;
      const result = await originOnUnload.apply(this, opts);
      return result;
    };
  };
}
