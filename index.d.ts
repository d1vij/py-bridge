import { PythonPath } from "./src/ts/python-path.ts"

declare module "@d1vij/py-bridge" {
    export function execute<T = string>(filepath: string, functionName: string, kwargs: Object = {}, port: string = "0"): Promise<ExecResults<T>>;
    export const pythonPath: PythonPath;
    private class PythonPath {
        private __path: string | undefined;
        public get(): string;
        public set(newPath: string): string;
    }
    export type ExecResults<T> = {
        success: boolean,
        errorMsg?: string,
        payload?: T
    }
}