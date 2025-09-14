import { pyExec } from "./exec.js";
import {execSync} from "child_process";
// helper function to pip install dependencies

export function install(name:string){
    execSync(`${pyExec} -m pip install ${name}`);
    return;
}