import {exec} from "@d1vij/py-bridge";
import {install} from "@d1vij/py-bridge";

install("numpy"); //installing numpy in local venv
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