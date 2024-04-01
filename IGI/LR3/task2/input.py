def generator_input():
    '''User int input via generator while number is not equal to zero'''
    while True:
        try:
            a = int(input())
        except:
            print('Error. Enter an integer')
            continue
        if a == 0:
            break
        yield a

def simple_input():
    '''User int input via list while number is not equal to zero'''
    arr = []
    while True:
        try:
            a = int(input())
        except:
            print('Error. Enter an integer')
            continue
        if a == 0:
            break
        arr.append(a)
    return arr
