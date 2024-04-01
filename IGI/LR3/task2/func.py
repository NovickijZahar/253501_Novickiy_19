from decorator import repeat, info

@repeat
@info
def product_of_last_digits() -> int:
    res = 1
    while True:
        try:
            a = int(input())
        except:
            print('Error. Enter a number')
            continue
        if a == 0:
            break
        res *= a % 10
    return res