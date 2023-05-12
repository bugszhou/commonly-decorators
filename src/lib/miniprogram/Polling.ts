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
      if (!this.__polling__list__) {
        this.__polling__list__ = Object.create(null);
      }

      if (!this.__polling__list__[pollingId]) {
        this.__polling__list__[pollingId] = [];
      }

      if (!Array.isArray(this.__polling__list__[pollingId])) {
        this.__polling__list__[pollingId] = [this.__polling__list__[pollingId]];
      }

      return new Promise(async (resolve) => {
        const result = await originFn.apply(this, opts);
        if (ReturnData.isOk(result)) {
          resolve(result);
          return;
        }

        const timer = setTimeout(async () => {
          this.__polling__list__[pollingId] = this.__polling__list__?.[
            pollingId
          ]?.filter((item: ReturnType<typeof setTimeout>) => item !== timer);
          clearTimeout(timer);
          fn.apply(this, opts);
        }, intervalTime);

        this.__polling__list__[pollingId].push(timer);
      });
    };

    const originOnUnload = target.onUnload;
    target.onUnload = async function newOnUnload(...opts: any[]) {
      this?.__polling__list__?.[pollingId]?.forEach(
        (item: ReturnType<typeof setTimeout>) => {
          clearTimeout(item);
        },
      );
      this.__polling__list__[pollingId] = null;
      const result = await originOnUnload.apply(this, opts);
      return result;
    };
  };
}

export function PollingAfter(intervalTime = 1000, pollingId = "__polling__") {
  return function closurePolling(
    target: any,
    property: string,
    descriptor: PropertyDescriptor,
  ) {
    const originFn = descriptor.value;

    descriptor.value = function fn(this: any, ...opts: any[]) {
      if (!this.__polling__list__) {
        this.__polling__list__ = Object.create(null);
      }

      if (!this.__polling__list__[pollingId]) {
        this.__polling__list__[pollingId] = [];
      }

      if (!Array.isArray(this.__polling__list__[pollingId])) {
        this.__polling__list__[pollingId] = [this.__polling__list__[pollingId]];
      }

      return new Promise(async (resolve) => {
        const timer = setTimeout(async () => {
          this.__polling__list__[pollingId] = this.__polling__list__?.[
            pollingId
          ]?.filter((item: ReturnType<typeof setTimeout>) => item !== timer);
          clearTimeout(timer);

          const result = await originFn.apply(this, opts);
          if (ReturnData.isOk(result)) {
            resolve(result);
            return;
          }

          fn.apply(this, opts);
        }, intervalTime);

        this.__polling__list__[pollingId].push(timer);
      });
    };

    const originOnUnload = target?.onUnload;
    target.onUnload = async function newOnUnload(...opts: any[]) {
      this?.__polling__list__?.[pollingId]?.forEach(
        (item: ReturnType<typeof setTimeout>) => {
          clearTimeout(item);
        },
      );
      this.__polling__list__[pollingId] = null;
      const result = await originOnUnload?.apply?.(this, opts);
      return result;
    };
  };
}

export function pollingClear(content: any, pollingId = "__polling__") {
  try {
    content.__polling__list__?.[pollingId]?.forEach(
      (item: ReturnType<typeof setTimeout>) => {
        clearTimeout(item);
      },
    );
    content.__polling__list__[pollingId] = null;
  } catch (e) {
    console.error(e);
  }
}

export function pollingClearAll(content: any) {
  try {
    Object.keys(content?.__polling__list__ || {}).forEach((pollingId) => {
      content?.__polling__list__?.[pollingId]?.forEach(
        (item: ReturnType<typeof setTimeout>) => {
          clearTimeout(item);
        },
      );

      clearTimeout(content?.__polling__list__?.[pollingId]);
      content.__polling__list__[pollingId] = null;
    });
  } catch (e) {
    console.error(e);
  }
}

export function PollingClearAllDeco() {
  return function closurePollingClearAllDeco(
    target: any,
    property: string,
    descriptor: PropertyDescriptor,
  ) {
    const originFn = descriptor.value;

    descriptor.value = function fn(this: any, ...opts: any[]) {
      const originResult = originFn.apply(this, opts);

      if (
        typeof originResult === "object" &&
        typeof originResult?.then === "function"
      ) {
        return originResult.then(
          () => {
            pollingClearAll(this);
          },
          () => {
            pollingClearAll(this);
          },
        );
      }

      pollingClearAll(this);

      return originResult;
    };
  };
}
