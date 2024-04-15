from func import TailorArccos
from check import input_float_in_range



if __name__ == "__main__":
    print('This program calculate the value of arccos via tailor series')
    x = input_float_in_range(-1, 1, 'Enther the float value of x between -1 and 1: ')
    eps = input_float_in_range(0, 1, 'Enter the positive value of eps <= 1: ')
    TailorArccos.draw_plot(x, eps)
    
    