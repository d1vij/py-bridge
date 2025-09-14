# PyBridge
PyBridge is a simple Node.js library for running Python functions without modifying your existing Python scripts.

It automatically sets up a Python virtual environment local to the nodejs enviornment upon installation.

> [!NOTE]
> The only python dependency is the `requests` library. Without it the python runtime cannot  communicate to the nodejs runtime.

## Installation

* Install the latest package from npm registry 

```sh
npm install @d1vij/py-bridge
```

## Usage
### Running python functions

* The core API is the `exec` function which asynchronously runs a target function from a python module and returns a promise with execution results.

```ts
// Signature
export function exec(
  filepath: string,      // Absolute path to the Python module
  functionName: string,  // Name of the function to run (must exist in the module)
  kwargs: Object = {},   // Keyword arguments, passed as foo(**kwargs)
  port?: string          // Optional port for Node-Python runtimes communication. (random if not specified)
): Promise<ExecResults>;
```

with `ExecResults` being defined as 
```ts
export type ExecResults = {
    success: boolean;   // whether the execution succeeded
    errorMsg?: string;  // exception raised (if any)
    payload?: string;   // return value of the Python function
};
```

### Example

```py
# ~/python-scripts/calc.py
def add(x: int, y: int) -> int:
    return x + y
```

```ts
// script.js
import {exec} from "@d1vij/py-bridge";
async function main(){
    const results = await exec("~/python-scripts/calc.py", "add", {
        x:10, //variables retain their datatype
        y:20
    })
    //returns payload as: 30 (int)
}
main();
```

> [!NOTE]
> More examples in the `/examples/` folder

## Using third party libraries

* If your targetted function's module requires any third party library, then it must be installed to the local env of package before calling the function.
* Libraries are pip installed via the `install` function, which takes in the name of the function
* Installation needs to be done only once per library

```ts
install("numpy"); //numpy now installed
install("matplotlib seaborn");
install("-r ~/path/to/my/requirements.txt")
```

> [!IMPORTANT] Although scripts can be executed without modifications, only JSON-serializable data can be returned as payloads.
Returning non-serializable Python objects will raise an exception.
To avoid this, wrap return values in a serializable form (e.g., str, list, or dict).

```py
# for example
import numpy as np
def foo() -> np.Array:
    return np.arange(1,10) # this would raise exception in the json.dumps

def bar() -> str:
    return str(np.arange(1,10)) # this could be fixed by returning a json serializable object instead

def foo_wrapper() -> str:
    return str(foo()) # or else calling a wrapper instead of foo
```
