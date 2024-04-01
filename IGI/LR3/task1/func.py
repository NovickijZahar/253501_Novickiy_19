from math import pi, factorial, pow, acos

def tailor_func(x: float, n: int) -> float:
    '''
    Сalculate the value of the arccos via Taylor series
    with a given number of series terms n
    '''
    res = pi / 2
    temp = x
    for i in range(n):
        res -= temp
        temp *= x**2 * (2*i + 1)**2 * (2*i + 2) / (4 * (2*i + 3) * (i + 1)**2)
    return res

def math_func(x: float) -> float:
    '''Calculate the value of arccos via math module'''
    return acos(x)

def calculate(x: float, eps: float) -> tuple[float, int]:
    '''
    Calculate the value of arccos via tailor series
    with given error
    '''
    for n in range(1, 501):
        if abs(tailor_func(x, n) - math_func(x)) <= eps:
            return tailor_func(x, n), n
    return tailor_func(x, 500), 500

