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