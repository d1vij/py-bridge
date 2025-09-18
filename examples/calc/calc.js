import {execute, pythonPath} from "../../dist/ts/execute.js";
pythonPath.set("/home/divij/coding/repos/py-bridge/examples/calc/.venv/bin/python")
async function main(){
    const results = (await execute("calc.py", "add", {
        x:1, y:2
    }));
    console.log(results.payload);
}

main();