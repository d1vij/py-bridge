import { exec, pythonPath } from "@d1vij/py-bridge";

pythonPath.set("/home/divij/coding/repos/py-bridge/examples/weather/.venv/bin/python")

async function main(){
    const results = await exec("squared_array.py", "square", {
        nums:[1,2,3,4,5,6,7,8,9,10]
    });
    console.log(results);
}
main();
/**
$ { 
    success: true,
    payload: [
        1,  4,  9, 16,  25,
        36, 49, 64, 81, 100
    ]
}
 */