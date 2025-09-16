import { spawn } from "child_process";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export type ExecResults<T> = {
    success: boolean,
    errorMsg?: string,
    payload?: T
}
export const pyExec =
  process.platform === "win32"
    ? path.join(__dirname, path.join("..","pyvenv","Scripts","python.exe"))
    : path.join(__dirname, path.join("..","/pyvenv/bin/python"));

export function exec<T = string>(filepath: string, functionName: string, kwargs: Object = {}, port: string = "0"): Promise<ExecResults<T>> {
    
    let pyCorePath = "../py/core.py"
    pyCorePath = path.join(__dirname,pyCorePath);
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
        const pyProcess = spawn(pyExec, [pyCorePath, "--path", filepath, "--entry", functionName, "--port", listeningPort]);
        pyProcess.on("error", (err) => {
            resolve({
                success: false,
                errorMsg: "Error in spawning python core process " + err
            })
        })
    })
}