export declare function Required(errMsg: string): ParameterDecorator;
export declare function CheckParamRequired(target: any, property: string, propertyDescriptor: PropertyDescriptor): void;
declare const _default: {
    Required: typeof Required;
    CheckParamRequired: typeof CheckParamRequired;
};
export default _default;
