import { spawn } from "child_process";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { PythonPath } from "./python-path.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const pythonPath = new PythonPath();

export type ExecResults<T> = {
    success: boolean,
    errorMsg?: string,
    payload?: T
}
    
export function execute<T = string>(filepath: string, functionName: string, kwargs: Object = {}, port: string = "0"): Promise<ExecResults<T>> {
    
    const pyCorePath = path.join(__dirname, "../py/core.py");
    return new Promise(resolve => {

        const app = express();
        app.use(express.json())

        const server = app.listen(port);
        server.on("error", () => {
            resolve({
                success: false,
                errorMsg: "Server startup error"
            })
        })

        // endpoint which the python script pings to recieve the args
        app.get("/ping", (_, response) => {
            response.json(kwargs);
            return;
        })
        app.post("/payload", (request, response) => {
            response.send(true); //request acknowledged by server
            server.close();
            resolve(request.body);
        })

        const listeningPort:string = (server.address() as import("net").AddressInfo).port.toString();
        const pyProcess = spawn(pythonPath.get(), [ pyCorePath,"--path", filepath, "--entry", functionName, "--port", listeningPort]);
        pyProcess.on("error", (err) => {
            resolve({
                success: false,
                errorMsg: "Error in spawning python core process " + err
            })
        })
    })
}