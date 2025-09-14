import argparse
import json
import requests

def execute(filepath:str, function_name:str, port:str, PING_URL:str):
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
        
    # ping server for the kwargs
    response = requests.get(PING_URL)
    try:
        kwargs = response.json()
    except Exception as e:
        raise Exception("Json parsing of kwargs failed") from e
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

    PING_URL = f"http://localhost:{args.port}/ping"
    PAYLOAD_URL = f"http://localhost:{args.port}/payload"

    try:
        results = execute(args.path, args.entry, args.port, PING_URL)
        response = requests.post(PAYLOAD_URL, json={
            "success": True,
            "payload": results
        })
        return
    except Exception as e:
        response = requests.post(PAYLOAD_URL, json={
            "success": False,
            "errorMsg": str(e)
        })
    
if(__name__ == "__main__"):
    main()
