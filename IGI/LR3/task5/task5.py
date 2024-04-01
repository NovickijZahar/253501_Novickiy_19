from check import check_input
from func import index_of_max_value, sum_between_first_and_second_negative_numbers
from input import simple_input, generator_input


if __name__ == '__main__':
     print('This program finds the index of max element in list and' +
           'calculates the sum between first and second negative elements of the list')
     n = check_input(int, lambda n: n > 1, 
                     error_message='The length of the list must be greater than 1',
                     info='Enter the length of list greater than 1: ')
     print('Enter float numbers separated by new line')
     arr = list(generator_input(n))
     print(f'Entered list: {arr}')
     print(f'Index of max element in the list = {index_of_max_value(arr)}')
     try:
          print(f'The sum between first and second negative elements of the list = ' +
               f'{sum_between_first_and_second_negative_numbers(arr)}')
     except Exception as e:
          print(e)

          