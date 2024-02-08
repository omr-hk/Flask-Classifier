import numpy as np
import pandas as pd
import tensorflow as tf
import model
print(np.__version__)
print(pd.__version__)
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))