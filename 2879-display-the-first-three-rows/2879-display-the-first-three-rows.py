import pandas as pd

def selectFirstRows(employees: pd.DataFrame) -> pd.DataFrame:
    res = employees.head(3)
    print(res)
    return res