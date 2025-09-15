declare module "@d1vij/py-bridge" {
    export function exec(filepath: string, functionName: string, kwargs: Object = {}, port: string = "0"): Promise<ExecResults>;
    export function install(name: string): void;
    export type ExecResults = {
        success: boolean,
        errorMsg?: string,
        payload?: string
    }
}