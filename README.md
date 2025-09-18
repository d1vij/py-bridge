# PyBridge
PyBridge is a simple Node.js library for running Python functions without modifying your existing Python scripts.

It uses your existing python environment to run the scripts.
 
> [!NOTE]
> The only Python dependency required is the requests module, which enables communication between the Python runtime and the ? > Node.js runtime. Although the Python runtime can automatically install this module if it is not found, it is strongly ?  recommended to install it in advance to avoid delays or unexpected runtime issues.

## Installation

* Install the latest package from npm registry 

```sh
npm install @d1vij/py-bridge
```

## Usage
### Running python functions

* Before running any Python script, the Python runtime must be made aware of the correct environment in order to resolve dependent modules. This is achieved by setting the absolute path to your existing environment using the pythonPath.set() method:

```ts
import { pythonPath } from "@d1vij/py-bridge";

// For Unix-based environments
pythonPath.set("/home/foo/bar/.venv/bin/python");

// For Windows environments
pythonPath.set("C:\\foo\\bar\\.venv\\scripts\\python.exe");

```

This configuration only needs to be set once per runtime session.

* The core API is the `execute` function which asynchronously runs a target function from a python module and returns a promise with execution results.

```ts
// Signature
export function execute<T>( // Type defaults to string if not passed, and has no runtime effect
  filepath: string,      // Absolute path to the Python module
  functionName: string,  // Name of the function to run (must exist in the module)
  kwargs: Object = {},   // Keyword arguments, passed as foo(**kwargs)
  port?: string          // Optional port for Node-Python runtimes communication. (random if not specified)
): Promise<ExecResults<T>>;
```

with `ExecResults` being defined as 
```ts
export type ExecResults<T> = {
    success: boolean;   // whether the execution succeeded
    errorMsg?: string;  // exception raised (if any)
    payload?: T;   // return value of the Python function
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
    const results = await execute("~/python-scripts/calc.py", "add", {
        x:10, //variables retain their datatype
        y:20
    })
    //returns payload as: 30 (int)
}
main();
```

> [!NOTE]
> More examples in the `/examples/` folder

> [!IMPORTANT]
> Although scripts can be executed without modifications, only JSON-serializable data can be returned as payloads.
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
