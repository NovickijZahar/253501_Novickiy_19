punctuation = '!"\'(),.:;?'

def ispunctuation(c: str):
    return c in punctuation

def isspace(c: str):
    return c == ' '