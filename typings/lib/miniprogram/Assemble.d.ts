interface IInject {
    new (...opts: any[]): any;
}
export declare function Assemble(key: string, constructor: IInject, constructorArgs?: string[]): (target: any, property: string) => void;
export {};
