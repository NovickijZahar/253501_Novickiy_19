from math import pi, acos
import matplotlib.pyplot as plt
import csv
import statistics

class TailorArccos:
    @staticmethod
    def tailor_func(x: float, n: int) -> float:
        '''
        Сalculate the value of the arccos via Taylor series
        with a given number of series terms n
        '''
        res = pi / 2
        temp = x
        for i in range(n):
            res -= temp
            temp *= x**2 * (2*i + 1)**2 * (2*i + 2) / (4 * (2*i + 3) * (i + 1)**2)
        return res

    @staticmethod
    def tailor_series(x: float, eps: float) -> list[float]:
        '''Сalculate the tailor series'''
        n = TailorArccos.calculate(x, eps)[1]
        res = pi / 2
        arr = [res]
        temp = x
        for i in range(n):
            res -= temp
            temp *= x**2 * (2*i + 1)**2 * (2*i + 2) / (4 * (2*i + 3) * (i + 1)**2)
            arr.append(res)
        return arr

    @staticmethod
    def math_func(x: float) -> float:
        '''Calculate the value of arccos via math module'''
        return acos(x)

    @staticmethod
    def calculate(x: float, eps: float) -> tuple[float, int]:
        '''
        Calculate the value of arccos via tailor series
        with given error
        '''
        for n in range(1, 501):
            if abs(TailorArccos.tailor_func(x, n) - TailorArccos.math_func(x)) <= eps:
                return TailorArccos.tailor_func(x, n), n
        return TailorArccos.tailor_func(x, 500), 500
    
    @staticmethod
    def calculate_mean(x: float, eps: float):
        return statistics.mean(TailorArccos.tailor_series(x, eps))
    
    @staticmethod
    def calculate_median(x: float, eps: float):
        return statistics.median(TailorArccos.tailor_series(x, eps))
    
    @staticmethod
    def calculate_mode(x: float, eps: float):
        return statistics.mode(TailorArccos.tailor_series(x, eps))
    
    @staticmethod
    def calculate_variance(x: float, eps: float):
        return statistics.variance(TailorArccos.tailor_series(x, eps))
    
    @staticmethod
    def calculate_stdev(x: float, eps: float):
        return statistics.stdev(TailorArccos.tailor_series(x, eps))


    @staticmethod
    def draw_plot(x: float, eps: float):
        n = TailorArccos.calculate(x, eps)[1]
        x1 = [float(i / 100) for i in range(-100, 101, 1)]
        y1 = [TailorArccos.math_func(i) for i in x1]
        y2 = [TailorArccos.tailor_func(i, n) for i in x1]
        with open('igi/lr4/task3/tailor.csv', 'w', newline='') as f1, open('igi/lr4/task3/arccos.csv', 'w', newline='') as f2:
            writer1 = csv.writer(f1, quoting=csv.QUOTE_ALL)
            writer2 = csv.writer(f2, quoting=csv.QUOTE_ALL)
            writer1.writerow(['x', 'y'])
            writer2.writerow(['x', 'y'])
            for x0, y0 in zip(x1, y1):
                writer1.writerow([x0, y0])
            writer1.writerow(['', ''])
            writer1.writerow(['Mean', TailorArccos.calculate_mean(x, eps)])
            writer1.writerow(['Median', TailorArccos.calculate_median(x, eps)])
            writer1.writerow(['Mode', TailorArccos.calculate_mode(x, eps)])
            writer1.writerow(['Variance', TailorArccos.calculate_variance(x, eps)])
            writer1.writerow(['Stdev', TailorArccos.calculate_stdev(x, eps)])
            writer1.writerow(['x', x])
            writer1.writerow(['n', n])
            writer1.writerow(['F(x)', TailorArccos.calculate(x, eps)[0]])
            writer1.writerow(['Math F(x)', TailorArccos.math_func(x)])
            writer1.writerow(['eps', eps])

            for x0, y0 in zip(x1, y2):
                writer2.writerow([x0, y0])

        plt.plot(x1, y1, '-o', color='red', label='Функция arccos')
        plt.plot(x1, y2, '-o', color='blue', label='Ряд Тейлора для arccos')
        plt.xlabel('x')
        plt.ylabel('y')
        plt.title('График функции arccos и ее разложения в ряд Тейлора')
        plt.grid()
        plt.legend()
        plt.savefig('igi/lr4/task3/plot.png')
        plt.show()