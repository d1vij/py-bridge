import argparse
try:
    import requests
except ModuleNotFoundError:
    # Installing requests module if not present in the runtime
    import subprocess
    import sys
    import importlib
    subprocess.check_call([sys.executable,"-m", "pip", "install", "requests"])
    requests = importlib.import_module("requests")

def execute(filepath:str, function_name:str, kwargs:dict):
    from function_loader import get_function_from_modulepath
    from os import path

    if(filepath is None):
        raise Exception("FIlename is not passed")
    if(function_name is None):
        raise Exception("entry function is not passed")
    
    if(not path.exists(filepath)):
        raise FileNotFoundError()

    __function = get_function_from_modulepath(function_name, filepath)
    if(__function is None):
        raise RuntimeError("Target module doesnt have the required function")
    
    try:
        return __function(**kwargs)
    except Exception as e:
        raise RuntimeError(f"Error in function execution -> {e}") from e
        
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--path")
    parser.add_argument("--entry")
    parser.add_argument("--port")
    args = parser.parse_args()


    # ping server for the kwargs
    response = requests.get(f"http://localhost:{args.port}/ping")
    try:
        kwargs = response.json()
    except Exception as e:
        requests.post(f"http://localhost:{args.port}/payload", json={
            "success": False,
            "errorMsg": "JSON parsing of kwargs failed -> " + str(e)
        })
        return
    try:
        results = execute(args.path, args.entry, kwargs)
        requests.post(f"http://localhost:{args.port}/payload", json={
            "success": True,
            "payload": results
        })
        return
    except Exception as e:
        requests.post(f"http://localhost:{args.port}/payload", json={
            "success": False,
            "errorMsg": str(e)
        })
        return
    
if(__name__ == "__main__"):
    main()
