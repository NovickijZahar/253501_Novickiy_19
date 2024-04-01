def info(func):
    def wrapper():
        print('This program calculates the product of last digits of sequence')
        print('Enter numbers separated by new line')
        print('To stop input enter 0')
        res = func()
        print(f'Result = {res}')
    return wrapper

def repeat(func):
    def wrapper():
        while True:
            func()
            a = input('Enter r to repeat or any other symbol to exit: ')
            if a != 'r':
                break
    return wrapper