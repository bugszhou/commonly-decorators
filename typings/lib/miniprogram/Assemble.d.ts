interface IInject {
    new (...opts: any[]): any;
}
export declare function Assemble(key: string, constructor: IInject, constructorArgs?: string[]): (target: any, property: string) => void;
export declare function AssembleValue<IValue = unknown>(key: string, value: IValue): (target: any, property: string) => void;
export {};
