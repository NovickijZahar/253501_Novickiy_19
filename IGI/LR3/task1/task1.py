from func import calculate, math_func
from check import input_float_in_range

if __name__ == "__main__":
    print('This program calculate the value of arccos via tailor series')
    x = input_float_in_range(-1, 1, 'Enther the float value of x between -1 and 1: ')
    eps = input_float_in_range(0, 1, 'Enter the positive value of x <= 1: ')
    f, n = calculate(x, eps)
    mf = math_func(x)
    print('x', 'n'.center(20), 'F(x)'.center(20), 'Math F(x)'.center(20), 'eps'.center(20))
    print(f'{x} {n:>8} {f:>22} {mf:>22} {eps:>17}')
    