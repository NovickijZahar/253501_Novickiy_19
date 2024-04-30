from figure import AbstractFigure
from color import Color
import matplotlib.patches as patches
import matplotlib.pyplot as plt

class Trapezoid(AbstractFigure):
    def __init__(self, height: int|float, lower_base: int|float, midline: int|float, color: str) -> None:
        super().__init__()
        if type(height) != int and type(height) != float:
            raise Exception('The height should be int or float')
        if type(lower_base) != int and type(lower_base) != float:
            raise Exception('The height should be int or float')
        if type(midline) != int and type(midline) != float:
            raise Exception('The midline should be int or float')
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
        return f'Trapezoid(height = {self.heigt}, lower base = {self.lower_base}, upper base = {self.upper_base},\n'\
                f'midline = {self.midline}, square = {self.calculate_square():0.2f}, color = {self.color.value})'
    
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
        plt.title(self)
        plt.savefig('igi/lr4/task4/trapezoid.png')
        plt.show()