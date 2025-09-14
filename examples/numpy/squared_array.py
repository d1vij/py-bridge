import numpy as np

def square(nums: list):
    arr = np.array(nums) ** 2
    return arr.tolist() # wrapper since np.Array is non json-serializable