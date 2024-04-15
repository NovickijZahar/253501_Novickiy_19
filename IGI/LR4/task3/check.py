def input_float_in_range(left: float, 
                         right: float, info="") -> float:
    '''
    Check if the float value is in a given range 
    '''
    while True:
        try:
            number = input(info)
            number = float(number)
            if number > right or number < left:
                raise Exception("The number is not in range")
            break
        except Exception as e:
            print(e)
    return number