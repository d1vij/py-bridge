import { exec, install } from "@d1vij/py-bridge";

install("matplotlib");
// install("numpy") // no need to install numpy since it was already installed once (referring to the numpy example)

async function main(){
    const results = await exec("plot.py", "plt_and_return_as_dataurl", {});
    if(results.success){
        const dataurl = results.payload.dataurl;
        console.log(dataurl);
    } else {
        console.log("Running function failed");
    }
}   

main();

/**
Output 
 $ data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAOnRFWHRTb2Z
 0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjEwLjYsIGh0dHBzOi8vbWF0cGxvdGxpYi5vcmcvq6yFwwAA
 AAlwSFlzAAAPYQAAD2EBqD+naQAAaoBJREFUeJzt3Xt4VNW9N/DvnpnMTK6T+w0CuYBA5CpICmq1JUdQ3
 iqtreLBg1KLb620ItYLPRVrrVKt9fVoOVpvVU+9tT1q1bYoRdGqCAgGuYRwCyQQJvdkkkky1/3+MbP3J
 H8/HwYDMNvbzOgB9XV1aGgoEDpYhARkc7V1tZi7Nixw/4cA3pQcnIygMBfZEpKisKlISIivXE4HCgoKJD
 j0XAxoAdJ3ewpKSkM6EREpJiRD...
*/