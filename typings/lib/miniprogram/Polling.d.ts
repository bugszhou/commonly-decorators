export default function Polling(intervalTime?: number, pollingId?: string): (target: any, property: string, descriptor: PropertyDescriptor) => void;
export declare function pollingClear(content: any, pollingId?: string): void;
export declare function pollingClearAll(content: any): void;
export declare function PollingClearAllDeco(): (target: any, property: string, descriptor: PropertyDescriptor) => void;
