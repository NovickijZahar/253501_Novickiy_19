from check import check_input

def generator_input(n: int):
    '''User float input via generator'''
    for i in range(n):
        a = check_input(float)
        yield a

def simple_input(n: int):
    '''User float input via list'''
    arr = []
    for i in range(n):
        a = check_input(float)
        arr.append(a)
    return arr
