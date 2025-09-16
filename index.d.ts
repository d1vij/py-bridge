declare module "@d1vij/py-bridge" {
    export function exec<T = string>(filepath: string, functionName: string, kwargs: Object = {}, port: string = "0"): Promise<ExecResults<T>>;
    export function install(name: string): void;
    export type ExecResults<T> = {
        success: boolean,
        errorMsg?: string,
        payload?: T
    }
}