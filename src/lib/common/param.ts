export function Required(errMsg: string): ParameterDecorator {
  return function _required(
    target: any,
    property: string | symbol,
    parameterIndex: number,
  ): void {
    if (!target?.__requiredData) {
      target.__requiredData = new Map();
    }
    target.__requiredData.set(property, {
      index: parameterIndex,
      errMsg,
    });
  };
}

export function CheckParamRequired(
  target: any,
  property: string,
  propertyDescriptor: PropertyDescriptor,
) {
  const originalFn = propertyDescriptor.value;
  propertyDescriptor.value = async function (...opts: any[]) {
    const requiredData: Map<
      string,
      {
        index: number;
        errMsg: string;
      }
    > = target?.__requiredData;
    const requiredInfo = requiredData.get(property);
    const index = Number(requiredInfo?.index);

    if (!isNaN(index) && (opts?.[index] ?? true)) {
      throw {
        status: "PARAM_ERROR",
        msg: requiredInfo?.errMsg || `第${index + 1}个参数必传`,
        data: null,
        from: "CheckParamRequired",
      };
    }

    let result = originalFn.apply(this, opts);
    if (typeof result?.then === "function") {
      result = await result;
    }

    return result;
  };
}

export default {
  Required,
  CheckParamRequired,
};
