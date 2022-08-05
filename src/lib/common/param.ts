export function Required(
  errMsg: string,
  propertyPath = "",
): ParameterDecorator {
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
      propertyPath,
    });
    if (!property) {
      return;
    }
    const originalFn = target[property];
    target[property] = async function (...opts: any[]) {
      const requiredData: Map<
        string,
        {
          index: number;
          errMsg: string;
          propertyPath: string;
        }
      > = target?.__requiredData;
      const requiredInfo = requiredData.get(property as string);
      const index = Number(requiredInfo?.index);
      const propertyPath = requiredInfo?.propertyPath;
      const propertyPaths = propertyPath?.split(".") || [];
      const val = propertyPaths.reduce((pre: any, pathKey: any) => {
        if (typeof pre === "undefined" || pre === null) {
          return pre;
        }
  
        if ((!pathKey && pathKey !== 0) || pathKey === ".") {
          return pre;
        }
        return pre?.[pathKey];
      }, opts?.[index]);
  
      if (
        !isNaN(index) &&
        (typeof val === "undefined" || val === "" || val === null)
      ) {
        throw new ParameterDecoratorError(
          requiredInfo?.errMsg || `第${index + 1}个参数必传`,
        );
      }
  
      const result = await originalFn.apply(this, opts);
  
      return result;
    };
  };
}

export class ParameterDecoratorError extends Error {
  __id = "ParameterDecoratorError";

  private status = "PARAM_ERROR";

  private data = null;

  private from = "CheckParamRequired";

  constructor(msg: string) {
    super(msg);
  }

  setData(val: any) {
    this.data = val;
  }

  getData() {
    return this.data;
  }

  setStatus(status: string) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  setFrom(from: string) {
    this.from = from;
  }

  getFrom() {
    return this.from;
  }

  static isParameterDecoratorError(obj: any) {
    return (
      obj instanceof ParameterDecoratorError ||
      obj?.__id === new ParameterDecoratorError("").__id
    );
  }
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
      if (typeof pre === "undefined" || pre === null) {
        return pre;
      }

      if ((!pathKey && pathKey !== 0) || pathKey === ".") {
        return pre;
      }
      return pre?.[pathKey];
    }, opts?.[index]);

    if (
      !isNaN(index) &&
      (typeof val === "undefined" || val === "" || val === null)
    ) {
      throw new ParameterDecoratorError(
        requiredInfo?.errMsg || `第${index + 1}个参数必传`,
      );
    }

    const result = await originalFn.apply(this, opts);

    return result;
  };
}

export default {
  Required,
  CheckParamRequired,
  ParameterDecoratorError,
};
