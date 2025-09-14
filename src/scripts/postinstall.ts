import {execSync} from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const venvDir = path.join(__dirname, "..", "pyvenv");

const pythonCmd = process.platform === "win32" ? "python" : "python3";
const pipPath =
  process.platform === "win32"
    ? path.join(venvDir, "Scripts", "pip.exe")
    : path.join(venvDir, "bin", "pip")
const reqFilePath = path.join(__dirname, "..", '..', "requirements.txt");
function run(cmd:string){
    console.log("> " + cmd);
    //@ts-ignore
    execSync(cmd, {stdio:"inherit", shell:true}); 
} 
    
function main(){
    if(!fs.existsSync(venvDir)){
        console.log("Creating python virtual environment");
        try{
            run(`${pythonCmd} -m venv ${venvDir}`);
        } catch(e) {
            console.log("Error in creating virtual environment, make sure python is instaled");
            console.log(e);
            process.exit(1);
        }
    }
    if(fs.existsSync(reqFilePath)){
        console.log("Installing python dependencies");
        try{
            run(`${JSON.stringify(pipPath)} install -r ${reqFilePath}`);
        } catch (e) {
            console.log("Error in installing python dependencies");
            console.log(e);
            process.exit(1);
        }
    } else {
        console.log("No requirements.txt found");
    }
    console.log("Installation done");
}
main();