import {exec} from "../../dist/ts/exec.js";
async function main(){
    const results = (await exec("calc.py", "add", {
        x:1, y:2
    }));
    console.log(results.payload);
}

main();