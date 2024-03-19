def input_float_in_range(left: float, 
                         right: float, info="") -> float:
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
