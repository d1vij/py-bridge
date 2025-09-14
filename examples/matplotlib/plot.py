import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO
import base64

def plt_and_return_as_dataurl():
    x = np.linspace(0, np.pi * 4, 250)  
    y = np.sin(x)
    plt.figure(figsize=(5,5))
    plt.plot(x, y)
    plt.tight_layout()

    buffer = BytesIO()
    plt.savefig(buffer, format="png")  # save plot to buffer as PNG
    buffer.seek(0)

    img_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return {
        "dataurl": f"data:image/png;base64,{img_base64}"
    }
