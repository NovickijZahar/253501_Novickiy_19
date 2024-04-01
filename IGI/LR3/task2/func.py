from decorator import repeat, info
from input import generator_input, simple_input

@repeat
@info
def product_of_last_digits() -> int:
    '''Return the product of last digits of sequence'''
    res = 1
    for n in generator_input():
        res *= n % 10 
    return res

