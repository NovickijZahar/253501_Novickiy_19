from matrix import Matrix

if __name__ == '__main__':
    m = Matrix(5, 6)
    print(f'Original matrix: \n{m}')
    print(f'Count of even elements = {m.count_even()}')
    print(f'Count of odd elements = {m.count_odd()}')
    print(f'Correlation coefficient = {m.calculate_correlation()}')
