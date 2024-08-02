import os
import pandas as pd

with open('resources/formatted.csv') as f:
    df = pd.read_csv(f)

print(df.head(1000))
    