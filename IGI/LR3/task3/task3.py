from func import ispunctuation, isspace

if __name__ == '__main__':
    print('This program counts the number of spaces, numbers and punctuation marks in a string')
    res = {}
    for c in input('Enter the line\n'):
        if c.isdigit() or ispunctuation(c) or isspace(c):
            res[c] = res.setdefault(c, 0) + 1
    print('Count of spaces, numbers and punctuation marks in a string:')
    for k, v in res.items():
        if k == ' ':
            k = 'space'
        print(f'{k} - {v}')
