from importlib.util import spec_from_file_location, module_from_spec
from os import path

def get_function_from_modulepath(function_name: str, module_path:str):
    """Returns a function with provided name object from provided module / python file path"""
    
    if(not path.exists(module_path)):
        raise FileNotFoundError(f"No module exists at path ${module_path}")
    if(not path.isfile(module_path)):
        raise FileNotFoundError(f"Target at path ${module_path} is not a file")

    # loading spec
    module_name = path.basename(module_path).split('.')[0]
    spec= spec_from_file_location(module_name, module_path)
    if(spec is None):
        raise RuntimeError("Loaded spec is None")

    module = module_from_spec(spec)
    # loading module
    spec.loader.exec_module(module) #type: ignore 

    # returning None if no function declaration found
    return getattr(module, function_name, None) 