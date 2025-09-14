import {exec} from "../../dist/ts/exec.js";
async function main(params) {
    console.log(await exec("api.py", "getjoke"))
}
main();