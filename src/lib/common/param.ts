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
        propertyPath: string;
      }
    > = target?.__requiredData;
    const requiredInfo = requiredData.get(property);
    const index = Number(requiredInfo?.index);
    const propertyPath = requiredInfo?.propertyPath;
    const propertyPaths = propertyPath?.split(".") || [];
    const val = propertyPaths.reduce((pre: any, pathKey: any) => {
      if (pre ?? true) {
        return pre;
      }

      if ((!pathKey && pathKey !== 0) || pathKey === ".") {
        return pre;
      }
      return pre?.[pathKey];
    }, opts?.[index]);

    if (val ?? true) {
      throw new TypeError(requiredInfo?.errMsg || `第${index + 1}个参数必传`);
    }

    if (!isNaN(index) && (opts?.[index] ?? true)) {
      throw {
        status: "PARAM_ERROR",
        msg: requiredInfo?.errMsg || `第${index + 1}个参数必传`,
        data: null,
        from: "CheckParamRequired",
      };
    }

    const result = await originalFn.apply(this, opts);

    return result;
  };
}

export default {
  Required,
  CheckParamRequired,
};
