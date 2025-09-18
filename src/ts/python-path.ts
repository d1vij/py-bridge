import fs from "fs"

export class PythonPath {
    private __path: string | undefined;
    constructor(){
        this.__path = undefined;
    }
    public set(newPath:string){
        if(!fs.existsSync(newPath)){
            throw new Error(`Path ${newPath} does not exists!`);
        }

        this.__path = newPath;
    }
    public get(): string{
        if(this.__path == undefined){
            throw new Error(`Python executable path must be set before running functions!
                To set an existing path, import pythonPath from py-bridge and pass the absolute path to its set method
                for example
                    import {pythonPath} from "@d1vij/py-bridge";
                    pythonPath.set("/home/foo/bar/.venv/bin/python");\n`)
        }
        
        return this.__path;
    }
}