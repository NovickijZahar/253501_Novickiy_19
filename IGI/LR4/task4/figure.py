from abc import ABC, abstractmethod
import matplotlib.patches as patches
import matplotlib.pyplot as plt
from math import pi

class AbstractFigure(ABC):
    @abstractmethod
    def calculate_square(self):
        pass

    @abstractmethod
    def draw_figure(self):
        pass