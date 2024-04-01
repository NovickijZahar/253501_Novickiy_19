def index_of_max_value(arr: list) -> int:
    '''Return the index of max element in array'''
    return arr.index(max(arr))

def sum_between_first_and_second_negative_numbers(arr: list) -> float:
    '''Return the sum between first and second negative numbers'''
    try:
        first, second = [i for i, v in enumerate(arr) if v < 0][:2]
        return sum(arr[first+1:second])
    except:
        raise Exception('There is no two negative elements')