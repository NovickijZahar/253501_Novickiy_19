from figure import AbstractFigure
from color import Color
import matplotlib.patches as patches
import matplotlib.pyplot as plt
from math import pi

class Circle(AbstractFigure):
    def __init__(self, radius: int|float, color: str) -> None:
        super().__init__()
        self.radius = radius
        self.color = Color(color)
    
    def calculate_square(self):
        return pi * self.radius * self.radius
    
    def __str__(self) -> str:
        return f'Circle(radius = {self.radius}, square = {self.calculate_square():0.2f}, color = {self.color.value})'
    
    def draw_figure(self):
        figure = patches.Circle(xy=(self.radius, self.radius), radius=self.radius, facecolor=self.color.value)
        fig, ax = plt.subplots()
        ax.add_patch(figure)
        ax.set_xlim(-1, 2 * self.radius + 1)
        ax.set_ylim(-1, 2 * self.radius + 1)
        plt.title(self)
        plt.savefig('igi/lr4/task4/circle.png')
        plt.show()