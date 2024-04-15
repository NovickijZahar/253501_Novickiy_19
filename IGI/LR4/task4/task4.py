from abc import ABC, abstractmethod
import matplotlib.patches as patches
import matplotlib.pyplot as plt


class AbstractFigure(ABC):
    @abstractmethod
    def calculate_square(self):
        pass

    @abstractmethod
    def draw_figure(self):
        pass

class Color:
    def __init__(self, value) -> None:
        self.__value = value
    @property
    def value(self) -> str:
        return self.__value
    @value.setter
    def value(self, new_value) -> None:
        self.__value = new_value
    @value.deleter
    def value(self) -> None:
        del self.__value
    # value = property(get_value, set_value, del_value)



class Trapezoid(AbstractFigure):
    def __init__(self, height, lower_base, midline, color) -> None:
        super().__init__()

        if 2 * midline - lower_base <= 0:
            raise Exception('The upper base would be negative or equals 0')
        self.heigt = height
        self.lower_base = lower_base
        self.upper_base = 2 * midline - lower_base
        self.midline = midline
        self.color = Color(color)
    def calculate_square(self):
        return self.midline * self.heigt
    def __str__(self) -> str:
        return f'Height = {self.heigt}, lower base = {self.lower_base}, upper base = {self.upper_base}, '\
                f'midline = {self.midline}, square = {self.calculate_square()}, color = {self.color.value}'
    def draw_figure(self):
        if self.lower_base >= self.upper_base:
            points = [[0, 0], [self.lower_base, 0], 
                      [self.lower_base - (self.lower_base - self.upper_base) / 2, self.heigt],
                      [(self.lower_base - self.upper_base) / 2, self.heigt]]
        else:
            points = [[self.upper_base - (self.upper_base - self.lower_base) / 2, 0], 
                      [(self.upper_base - self.lower_base) / 2, 0],
                      [0, self.heigt],
                      [self.upper_base, self.heigt]]
        rect = patches.Polygon(points, closed=True, facecolor=self.color.value)
        fig, ax = plt.subplots()
        ax.add_patch(rect)
        if self.lower_base >= self.upper_base:
            ax.set_xlim(-1, self.lower_base + 1)
        else:
            ax.set_xlim(-1, self.upper_base + 1)
        ax.set_ylim(-1, self.heigt + 1)
        plt.savefig('igi/lr4/task4/plot.png')
        plt.show()

    
t = Trapezoid(10, 20, 15, 'blue')
print(t)
t.draw_figure()
