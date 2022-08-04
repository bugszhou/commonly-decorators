export declare function Required(errMsg: string, propertyPath?: string): ParameterDecorator;
export declare class ParameterDecoratorError extends Error {
    __id: string;
    private status;
    private data;
    private from;
    constructor(msg: string);
    setData(val: any): void;
    getData(): null;
    setStatus(status: string): void;
    getStatus(): string;
    setFrom(from: string): void;
    getFrom(): string;
    static isParameterDecoratorError(obj: any): boolean;
}
export declare function CheckParamRequired(target: any, property: string, propertyDescriptor: PropertyDescriptor): void;
declare const _default: {
    Required: typeof Required;
    CheckParamRequired: typeof CheckParamRequired;
    ParameterDecoratorError: typeof ParameterDecoratorError;
};
export default _default;
