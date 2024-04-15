import numpy as np
from statistics import correlation

class Matrix:
    def __init__(self, n, m, min=-10, max=10) -> None:
        self.matrix = np.random.randint(min, max, size=(n, m))

    def calculate_correlation(self) -> float:
        arr = self.matrix.flatten()
        even = arr[::2]
        odd = arr[1::2]
        return correlation(even, odd)
    
    def count_odd(self) -> int:
        return len(self.matrix[self.matrix % 2 == 0])
    
    def count_even(self) -> int:
        return len(self.matrix[self.matrix % 2 == 1])

    def __str__(self) -> str:
        return str(self.matrix)

