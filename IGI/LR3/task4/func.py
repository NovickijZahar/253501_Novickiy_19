vowels = 'aeyuio'
def find_vowels(line: str) -> int:
    '''Count number of words starting or ending to a vowel'''
    line = line.replace(',', '')
    res = 0
    for word in line.lower().split():
        for c in vowels:
            res += word.startswith(c) or word.endswith(c)
    return res

def repetition(line: str) -> dict:
    '''Count how many times each symbol is repeated;'''
    res = {}
    for c in line.lower():
        res[c] = res.setdefault(c, 0) + 1
    return res

def sort_alphabet_order(line: str) -> str:
    '''Words after commas in alphabetical order'''
    return sorted(map(lambda word: word.split(maxsplit=1)[0], line.split(',')[1:]), key=lambda word: word.lower())